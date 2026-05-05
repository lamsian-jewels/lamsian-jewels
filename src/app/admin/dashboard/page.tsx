"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase, type Product, type Order } from "@/lib/supabase";
import { LogOut, Plus, Package, ShoppingBag, Trash2, Edit3, Check, X } from "lucide-react";

type Tab = "products" | "orders";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<"all" | Product["category"]>("all");

  const categoryOptions: Array<"all" | Product["category"]> = [
    "all",
    "rings",
    "necklaces",
    "earrings",
    "bracelets",
    "anklets",
    "watches",
    "sets",
  ];

  const filteredProducts =
    categoryFilter === "all"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  // New product form state
  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "",
    category: "rings", images: "", material: "",
    in_stock: true, is_new: false, is_featured: false,
  });

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) router.push("/admin");
  };

  const fetchData = async () => {
    setLoading(true);
    const [{ data: p }, { data: o }] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
    ]);
    setProducts(p || []);
    setOrders(o || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    // Validation
    setSaveError("");
    setSaveSuccess(false);

    if (!form.name.trim()) {
      setSaveError("Product name is required");
      return;
    }
    if (!form.price || parseFloat(form.price) <= 0) {
      setSaveError("Valid price is required");
      return;
    }
    if (!form.images.trim()) {
      setSaveError("At least one image is required");
      return;
    }
    if (!form.description.trim()) {
      setSaveError("Description is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
        slug: form.slug || generateSlug(form.name),
      };

      let result;
      if (editId) {
        result = await supabase.from("products").update(payload).eq("id", editId);
      } else {
        result = await supabase.from("products").insert(payload);
      }

      if (result.error) {
        setSaveError(result.error.message || "Failed to save product");
        return;
      }

      setSaveSuccess(true);
      setTimeout(() => {
        setShowAddForm(false);
        setEditId(null);
        setForm({ name: "", slug: "", description: "", price: "", category: "rings", images: "", material: "", in_stock: true, is_new: false, is_featured: false });
        setSaveSuccess(false);
        fetchData();
      }, 1500);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (p: Product) => {
    setForm({
      name: p.name, slug: p.slug, description: p.description || "",
      price: String(p.price), category: p.category,
      images: p.images.join(", "), material: p.material || "",
      in_stock: p.in_stock, is_new: p.is_new, is_featured: p.is_featured,
    });
    setEditId(p.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchData();
  };

  const handleToggleStock = async (id: string, current: boolean) => {
    await supabase.from("products").update({ in_stock: !current }).eq("id", id);
    fetchData();
  };

  const handleOrderStatus = async (id: string, status: Order["status"]) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchData();
  };

  const statusColors: Record<Order["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar + Main */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-60 bg-charcoal-900 flex flex-col">
          <div className="p-6 border-b border-charcoal-700">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden">
                <Image src="/logo.jpeg" alt="Lamsian" fill className="object-cover" />
              </div>
              <div>
                <p className="font-display text-base text-cream-50">Lamsian</p>
                <p className="font-body text-[9px] tracking-widest text-gold-400 uppercase">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {[
              { id: "products", label: "Products", icon: <Package size={16} /> },
              { id: "orders", label: "Orders", icon: <ShoppingBag size={16} /> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body transition-colors ${
                  tab === item.id
                    ? "bg-gold-500 text-charcoal-900"
                    : "text-cream-300 hover:bg-charcoal-700"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-charcoal-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body text-cream-300 hover:text-gold-400 transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            <h1 className="font-display text-2xl text-charcoal-900 capitalize">{tab}</h1>
            {tab === "products" && (
              <button
                onClick={() => { setShowAddForm(true); setEditId(null); setForm({ name: "", slug: "", description: "", price: "", category: "rings", images: "", material: "", in_stock: true, is_new: false, is_featured: false }); setSaveError(""); setSaveSuccess(false); }}
                className="flex items-center gap-2 bg-charcoal-900 text-cream-50 px-5 py-2 text-xs tracking-widest uppercase font-body hover:bg-gold-500 hover:text-charcoal-900 transition-colors"
              >
                <Plus size={14} />
                Add Product
              </button>
            )}
          </div>

          <div className="p-8">
            {/* Add/Edit Form */}
            {showAddForm && tab === "products" && (
              <div className="bg-white border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl text-charcoal-900">{editId ? "Edit" : "Add"} Product</h2>
                  <button onClick={() => { setShowAddForm(false); setSaveError(""); }} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>

                {saveError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-body">
                    {saveError}
                  </div>
                )}

                {saveSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm font-body">
                    ✓ Product saved successfully!
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Product Name", key: "name", type: "text" },
                    { label: "Slug (auto-generated if empty)", key: "slug", type: "text" },
                    { label: "Price (KES)", key: "price", type: "number" },
                    { label: "Material", key: "material", type: "text" },
                  ].map(({ label, key, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-body tracking-widest text-gray-500 uppercase mb-1">{label}</label>
                      <input
                        type={type}
                        value={form[key as keyof typeof form] as string}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border border-gray-200 px-3 py-2 text-sm font-body focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-body tracking-widest text-gray-500 uppercase mb-1">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-gray-200 px-3 py-2 text-sm font-body focus:outline-none focus:border-gold-500"
                    >
                      {["rings","necklaces","earrings","bracelets","anklets","watches","sets"].map(c => (
                        <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-body tracking-widest text-gray-500 uppercase mb-1">Images</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        id="img-upload"
                        className="hidden"
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          const urls: string[] = [];
                          for (const file of files) {
                            const fd = new FormData();
                            fd.append("file", file);
                            const res = await fetch("/api/upload", { method: "POST", body: fd });
                            const data = await res.json();
                            if (data.url) urls.push(data.url);
                          }
                          const existing = form.images ? form.images.split(",").map(s => s.trim()).filter(Boolean) : [];
                          setForm({ ...form, images: [...existing, ...urls].join(", ") });
                        }}
                      />
                      <label htmlFor="img-upload" className="flex items-center gap-2 border border-gray-200 px-4 py-2 text-xs font-body text-gray-600 hover:border-gold-500 hover:text-gold-500 transition-colors cursor-pointer">
                        ↑ Upload Images
                      </label>
                    </div>
                    <input
                      type="text"
                      value={form.images}
                      onChange={(e) => setForm({ ...form, images: e.target.value })}
                      className="w-full border border-gray-200 px-3 py-2 text-sm font-body focus:outline-none focus:border-gold-500"
                      placeholder="URLs auto-filled after upload, or paste manually"
                    />
                    {form.images && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {form.images.split(",").map(s => s.trim()).filter(Boolean).map((url, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={i} src={url} alt="" className="w-16 h-16 object-cover border border-gray-200" />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-body tracking-widest text-gray-500 uppercase mb-1">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      className="w-full border border-gray-200 px-3 py-2 text-sm font-body focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="col-span-2 flex gap-6">
                    {[
                      { key: "in_stock", label: "In Stock" },
                      { key: "is_new", label: "New Arrival" },
                      { key: "is_featured", label: "Featured" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 font-body text-sm text-charcoal-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form[key as keyof typeof form] as boolean}
                          onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                          className="accent-gold-500"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center gap-2 px-6 py-2.5 text-xs tracking-widest uppercase font-body transition-colors ${
                      saving
                        ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                        : "bg-charcoal-900 text-cream-50 hover:bg-gold-500 hover:text-charcoal-900"
                    }`}
                  >
                    <Check size={14} />
                    {saving ? "Saving..." : editId ? "Update" : "Save"} Product
                  </button>
                  <button onClick={() => setShowAddForm(false)} disabled={saving} className={`px-6 py-2.5 text-xs tracking-widest uppercase font-body border border-gray-200 text-gray-500 hover:border-gray-400 transition-colors ${saving ? "opacity-50 cursor-not-allowed" : ""}`}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-20 font-body text-gray-400">Loading...</div>
            ) : tab === "products" ? (
              /* Products Table */
              <>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="font-body text-sm text-gray-600">Showing {filteredProducts.length} of {products.length} products</div>
                  <label className="flex items-center gap-3 font-body text-sm text-gray-600">
                    <span className="uppercase tracking-[0.2em] text-[10px] text-gray-500">Category</span>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)}
                      className="border border-gray-200 bg-white text-sm text-charcoal-700 px-3 py-2 focus:outline-none focus:border-gold-500"
                    >
                      {categoryOptions.map((category) => (
                        <option key={category} value={category}>
                          {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="bg-white border border-gray-200 overflow-hidden">
                  <table className="w-full admin-table">
                    <thead>
                    <tr className="border-b border-gray-100">
                      {["Product", "Category", "Price", "Stock", "Badges", "Actions"].map(h => (
                        <th key={h} className="text-left px-5 py-3 font-body text-[10px] tracking-widest text-gray-400 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {p.images?.[0] && (
                              <div className="relative w-10 h-10 overflow-hidden bg-cream-200 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div>
                              <p className="font-body text-sm text-charcoal-900 font-medium">{p.name}</p>
                              <p className="font-body text-xs text-gray-400">{p.material}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-body text-sm text-gray-600 capitalize">{p.category}</td>
                        <td className="px-5 py-4 font-body text-sm text-charcoal-900">KES {p.price.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => handleToggleStock(p.id, p.in_stock)}
                            className={`text-xs px-3 py-1 font-body tracking-wide ${p.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                          >
                            {p.in_stock ? "In Stock" : "Out of Stock"}
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-1">
                            {p.is_new && <span className="text-[9px] bg-gold-100 text-gold-700 px-2 py-0.5 tracking-widest uppercase font-body">New</span>}
                            {p.is_featured && <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 tracking-widest uppercase font-body">Featured</span>}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(p)} className="text-gray-400 hover:text-gold-500 transition-colors"><Edit3 size={15} /></button>
                            <button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProducts.length === 0 && (
                  <div className="text-center py-16 font-body text-gray-400">No products found for this category.</div>
                )}
              </div>
            </>
            ) : (
              /* Orders Table */
              <div className="bg-white border border-gray-200 overflow-hidden">
                <table className="w-full admin-table">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {["Customer", "Product", "Location", "Status", "Date", "Action"].map(h => (
                        <th key={h} className="text-left px-5 py-3 font-body text-[10px] tracking-widest text-gray-400 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-gray-50">
                        <td className="px-5 py-4">
                          <p className="font-body text-sm text-charcoal-900 font-medium">{o.customer_name}</p>
                          <p className="font-body text-xs text-gray-400">{o.customer_phone}</p>
                        </td>
                        <td className="px-5 py-4 font-body text-sm text-gray-700">{o.product_name}</td>
                        <td className="px-5 py-4 font-body text-sm text-gray-600">{o.customer_location}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[10px] px-2.5 py-1 font-body tracking-wide uppercase ${statusColors[o.status]}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-body text-xs text-gray-400">
                          {new Date(o.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={o.status}
                            onChange={(e) => handleOrderStatus(o.id, e.target.value as Order["status"])}
                            className="border border-gray-200 text-xs font-body px-2 py-1 focus:outline-none focus:border-gold-500"
                          >
                            {["pending","confirmed","shipped","delivered","cancelled"].map(s => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && (
                  <div className="text-center py-16 font-body text-gray-400">No orders yet.</div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
