import React, { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useDatabase } from "@/hooks/useDatabase";
import AdminAuth from "@/components/AdminAuth";
import {
  FaCalendarAlt,
  FaProjectDiagram,
  FaUsers,
  FaNewspaper,
  FaFileAlt,
  FaCertificate,
  FaBook,
  FaRocket,
  FaGraduationCap,
  FaTrophy,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaExternalLinkAlt,
  FaTimes,
  FaCheck,
  FaArrowLeft,
  FaSignOutAlt,
  FaImage,
} from "react-icons/fa";

// The 10 sections configured with metadata and fields
const SECTIONS = [
  {
    id: "events",
    label: "Events & Symposia",
    singular: "Event",
    icon: <FaCalendarAlt />,
    categoryKey: "category",
    dateKey: "date",
    color: "#3B82F6",
  },
  {
    id: "projects",
    label: "R&D Projects",
    singular: "Project",
    icon: <FaProjectDiagram />,
    categoryKey: "categories",
    dateKey: "publishedAt",
    color: "#10B981",
  },
  {
    id: "corecommittee",
    label: "Core Committee",
    singular: "Committee Member",
    icon: <FaUsers />,
    categoryKey: "department",
    dateKey: "year",
    color: "#8B5CF6",
  },
  {
    id: "news",
    label: "News & Dispatches",
    singular: "News Article",
    icon: <FaNewspaper />,
    categoryKey: "categories",
    dateKey: "publishedAt",
    color: "#EC4899",
  },
  {
    id: "publications",
    label: "Publications & Papers",
    singular: "Publication",
    icon: <FaFileAlt />,
    categoryKey: "category",
    dateKey: "year",
    color: "#6366F1",
  },
  {
    id: "patents",
    label: "Patents & IP",
    singular: "Patent",
    icon: <FaCertificate />,
    categoryKey: "category",
    dateKey: "date",
    color: "#F59E0B",
  },
  {
    id: "books",
    label: "Books & Blogs",
    singular: "Book",
    icon: <FaBook />,
    categoryKey: "category",
    dateKey: "year",
    color: "#06B6D4",
  },
  {
    id: "startups",
    label: "Incubated Startups",
    singular: "Startup",
    icon: <FaRocket />,
    categoryKey: "category",
    dateKey: "establishedDate",
    color: "#F97316",
  },
  {
    id: "alumni",
    label: "Alumni Network",
    singular: "Alumnus",
    icon: <FaGraduationCap />,
    categoryKey: "department",
    dateKey: "graduationYear",
    color: "#14B8A6",
  },
  {
    id: "achievements",
    label: "Achievements & Honors",
    singular: "Achievement",
    icon: <FaTrophy />,
    categoryKey: "category",
    dateKey: "date",
    color: "#EAB308",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });
  const [isSaving, setIsSaving] = useState(false);

  // Database hooks for all 10 collections
  const eventsDB = useDatabase("events");
  const projectsDB = useDatabase("projects");
  const coreCommitteeDB = useDatabase("corecommittee");
  const newsDB = useDatabase("news");
  const publicationsDB = useDatabase("publications");
  const patentsDB = useDatabase("patents");
  const booksDB = useDatabase("books");
  const startupsDB = useDatabase("startups");
  const alumniDB = useDatabase("alumni");
  const achievementsDB = useDatabase("achievements");

  const dbMap = {
    events: eventsDB,
    projects: projectsDB,
    corecommittee: coreCommitteeDB,
    news: newsDB,
    publications: publicationsDB,
    patents: patentsDB,
    books: booksDB,
    startups: startupsDB,
    alumni: alumniDB,
    achievements: achievementsDB,
  };

  const currentDB = dbMap[activeTab];
  const activeSectionConfig = SECTIONS.find((s) => s.id === activeTab);

  // Filter current items by search query
  const filteredItems = useMemo(() => {
    const items = currentDB?.data || [];
    if (!searchTerm.trim()) return items;
    const q = searchTerm.toLowerCase();
    return items.filter((item) => {
      const title = (item.title || item.name || item.event || item.shortTitle || "").toLowerCase();
      const desc = (item.description || item.content || item.abstract || item.bio || item.mission || "").toLowerCase();
      const cat = (item.categories || item.category || item.department || item.designation || "").toLowerCase();
      return title.includes(q) || desc.includes(q) || cat.includes(q);
    });
  }, [currentDB?.data, searchTerm]);

  // Open modal for new item
  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Delete flow
  const handleConfirmDelete = async () => {
    if (!deleteModal.item) return;
    const id = deleteModal.item.id || deleteModal.item._id;
    try {
      await currentDB.deleteItem(id);
      setDeleteModal({ isOpen: false, item: null });
    } catch (err) {
      alert("Failed to delete item: " + err.message);
    }
  };

  return (
    <AdminAuth>
      <Head>
        <title>ADMIN CONSOLE // ADVANCED ACADEMIC CENTER</title>
      </Head>

      <div className="min-h-screen bg-[#08090C] text-[#FAF6ED] flex flex-col font-sans">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#111318] border-b border-[#2A261F] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E5A93C]/10 border border-[#2A261F] flex items-center justify-center text-[#E5A93C] font-mono font-bold text-sm">
              AAC
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
                <span>Console</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">
                  v2.0
                </span>
              </h1>
              <p className="text-[10px] font-mono text-[#9E988A]">GRIET // AAC</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-mono uppercase tracking-wider text-[#9E988A] hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors"
            >
              <span>Visit Website</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </Link>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("aac_admin_token");
                window.location.reload();
              }}
              className="text-xs font-mono uppercase tracking-wider text-red-400 hover:text-red-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 transition-all cursor-pointer"
            >
              <FaSignOutAlt />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        {/* Dashboard Shell: Sidebar + Main Content */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Left Navigation Sidebar */}
          <aside className="w-full md:w-64 bg-[#111318] border-r border-[#2A261F] p-4 shrink-0 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9E988A] px-3 py-2 font-semibold">
              Content Collections
            </span>
            <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-140px)]">
              {SECTIONS.map((sec) => {
                const count = dbMap[sec.id]?.data?.length || 0;
                const isActive = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(sec.id);
                      setSearchTerm("");
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-[#E5A93C] text-[#08090C] shadow-md shadow-[#E5A93C]/20 font-bold"
                        : "text-[#9E988A] hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm opacity-90">{sec.icon}</span>
                      <span>{sec.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#08090C]/20 text-[#08090C]"
                          : "bg-white/5 text-[#9E988A]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Workspace */}
          <main className="flex-1 p-6 md:p-8 bg-[#08090C] overflow-x-hidden">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#2A261F]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {activeSectionConfig?.label}
                  </h2>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#E5A93C]/10 text-[#E5A93C] border border-[#2A261F] font-semibold">
                    {currentDB?.data?.length || 0} Total
                  </span>
                </div>
                <p className="text-xs text-[#9E988A]">
                  Manage, add, update, and remove items in this section.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#F6C463] text-[#08090C] text-xs font-bold tracking-wide transition-all shadow-lg shadow-[#E5A93C]/20 cursor-pointer"
                >
                  <FaPlus className="text-[10px]" />
                  <span>Add New {activeSectionConfig?.singular}</span>
                </button>
              </div>
            </div>

            {/* Search Filter Bar */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E988A] text-xs" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${activeSectionConfig?.label.toLowerCase()} by title, description, or category...`}
                className="w-full bg-[#111318] border border-[#2A261F] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-[#9E988A]/60 focus:outline-none focus:border-[#E5A93C] transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E988A] hover:text-white text-xs p-1"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Data Table / List */}
            {currentDB?.loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-white/40 gap-3">
                <div className="w-6 h-6 border-2 border-[#E5A93C] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  Loading data...
                </span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl p-8 bg-[#090D18]/50">
                <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-white/30 text-xl mb-3">
                  {activeSectionConfig?.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  No {activeSectionConfig?.label.toLowerCase()} found
                </h3>
                <p className="text-xs text-white/45 max-w-sm mx-auto mb-4">
                  {searchTerm
                    ? "No items match your search term. Try clearing the filter."
                    : "No items exist in this collection yet. Add your first item."}
                </p>
                {!searchTerm && (
                  <button
                    type="button"
                    onClick={handleOpenAdd}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
                  >
                    <FaPlus className="text-[10px]" />
                    <span>Create First Item</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#111318]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-white/50 font-mono text-[10px] uppercase tracking-wider">
                        <th className="py-3 px-4 w-14">Media</th>
                        <th className="py-3 px-4">Title / Name</th>
                        <th className="py-3 px-4">Category / Role</th>
                        <th className="py-3 px-4">Date / Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredItems.map((item, idx) => {
                        const title =
                          item.title ||
                          item.name ||
                          item.event ||
                          item.shortTitle ||
                          "Untitled";
                        const sub =
                          item.description ||
                          item.abstract ||
                          item.content ||
                          item.bio ||
                          item.mission ||
                          "";
                        const cat =
                          item.categories ||
                          item.category ||
                          item.department ||
                          item.designation ||
                          "—";
                        const image =
                          item.mainImageUrl ||
                          item.img ||
                          item.image ||
                          item.cover ||
                          item.logo ||
                          item.mainImage;
                        const dateVal =
                          item.date ||
                          item.publishedAt ||
                          item.year ||
                          item.graduationYear ||
                          item.establishedDate ||
                          item.status ||
                          "—";

                        return (
                          <tr
                            key={item.id || item._id || idx}
                            className="hover:bg-white/[0.03] transition-colors group"
                          >
                            {/* Thumbnail */}
                            <td className="py-3 px-4">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                                {image ? (
                                  <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <FaImage className="text-white/20 text-xs" />
                                )}
                              </div>
                            </td>

                            {/* Title & Description */}
                            <td className="py-3 px-4 max-w-xs">
                              <div className="font-semibold text-white truncate group-hover:text-[#E5A93C] transition-colors">
                                {title}
                              </div>
                              {sub && (
                                <div className="text-[11px] text-white/45 truncate mt-0.5">
                                  {sub}
                                </div>
                              )}
                            </td>

                            {/* Category / Badge */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/80">
                                {String(cat)}
                              </span>
                            </td>

                            {/* Date or Metadata */}
                            <td className="py-3 px-4 text-white/60 font-mono text-[11px] whitespace-nowrap">
                              {typeof dateVal === "string" && dateVal.includes("T")
                                ? new Date(dateVal).toLocaleDateString()
                                : String(dateVal)}
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEdit(item)}
                                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                                  title="Edit Item"
                                >
                                  <FaEdit className="text-xs" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDeleteModal({ isOpen: true, item })
                                  }
                                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                  title="Delete Item"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ====================================================================
          ADD / EDIT ITEM MODAL
          ==================================================================== */}
      {isModalOpen && (
        <ItemFormModal
          section={activeTab}
          sectionConfig={activeSectionConfig}
          item={editingItem}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSave={async (formData) => {
            setIsSaving(true);
            try {
              if (editingItem) {
                const id = editingItem.id || editingItem._id;
                await currentDB.updateItem(id, formData);
              } else {
                await currentDB.addItem(formData);
              }
              setIsModalOpen(false);
              setEditingItem(null);
            } catch (err) {
              alert("Error saving: " + err.message);
            } finally {
              setIsSaving(false);
            }
          }}
          isSaving={isSaving}
        />
      )}

      {/* ====================================================================
          CONFIRM DELETE MODAL
          ==================================================================== */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#111318] border border-red-500/30 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 text-red-400">
              <FaTrash />
              <span>Confirm Permanent Deletion</span>
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-6">
              Are you sure you want to delete{" "}
              <strong className="text-white">
                &ldquo;
                {deleteModal.item?.title ||
                  deleteModal.item?.name ||
                  deleteModal.item?.event ||
                  "this item"}
                &rdquo;
              </strong>
              ? This action will permanently remove it from the website.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal({ isOpen: false, item: null })}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminAuth>
  );
}

// ============================================================================
// MODAL FORM COMPONENT: DYNAMIC FIELDS BASED ON SECTION
// ============================================================================
function ItemFormModal({ section, sectionConfig, item, onClose, onSave, isSaving }) {
  const isEdit = Boolean(item);

  // Initialize form fields based on collection
  const [formData, setFormData] = useState(() => {
    if (item) {
      return { ...item };
    }
    // Default templates per collection
    switch (section) {
      case "events":
        return {
          title: "",
          date: "",
          category: "Symposium",
          status: "Upcoming",
          location: "GRIET Campus, Hyderabad",
          organizer: "Advanced Academic Center",
          description: "",
          detailedDescription: "",
          mainImageUrl: "",
          ctaText: "Register Now",
          ctaLink: "",
          path: "",
        };
      case "projects":
        return {
          title: "",
          categories: "Autonomous Systems",
          author: "AAC Student Team",
          description: "",
          content: "",
          names: "",
          mainImageUrl: "",
          githubRepo: "",
          status: "active",
        };
      case "corecommittee":
        return {
          name: "",
          designation: "Coordinator",
          year: new Date().getFullYear(),
          department: "CSE",
          image: "",
          linkedin: "",
          status: "active",
        };
      case "news":
        return {
          title: "",
          categories: "ACHIEVEMENT",
          publishedAt: new Date().toISOString().split("T")[0],
          content: "",
          mainImageUrl: "",
          status: "published",
        };
      case "publications":
        return {
          title: "",
          authors: "",
          publication: "",
          year: new Date().getFullYear(),
          category: "Machine Learning",
          abstract: "",
          paperLink: "",
          type: "Journal Paper",
        };
      case "patents":
        return {
          title: "",
          shortTitle: "",
          applicationNumber: "",
          patentOffice: "India",
          date: new Date().toISOString().split("T")[0],
          category: "Healthcare",
          status: "PUBLISHED ONLINE",
          inventors: "",
          description: "",
        };
      case "books":
        return {
          title: "",
          authors: "",
          category: "Programming",
          year: new Date().getFullYear(),
          cover: "",
          description: "",
          status: "published",
        };
      case "startups":
        return {
          name: "",
          founders: "",
          category: "Interactive Tech",
          status: "Active Enterprise",
          mission: "",
          description: "",
          establishedDate: new Date().toISOString().split("T")[0],
          website: "",
        };
      case "alumni":
        return {
          name: "",
          designation: "",
          company: "",
          graduationYear: new Date().getFullYear() - 1,
          department: "CSE",
          email: "",
          linkedin: "",
          currentLocation: "",
          bio: "",
          image: "",
        };
      case "achievements":
        return {
          title: "",
          category: "National Honor",
          date: new Date().toISOString().split("T")[0],
          names: "",
          description: "",
          mainImage: "",
          status: "published",
        };
      default:
        return {};
    }
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format array fields if string
    const payload = { ...formData };
    if (typeof payload.authors === "string") {
      payload.authors = payload.authors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (typeof payload.inventors === "string") {
      payload.inventors = payload.inventors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (typeof payload.founders === "string") {
      payload.founders = payload.founders
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (typeof payload.names === "string") {
      payload.names = payload.names
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    onSave(payload);
  };

  // Preview image URL
  const previewImg =
    formData.mainImageUrl ||
    formData.image ||
    formData.cover ||
    formData.img ||
    formData.mainImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#111318] border border-white/15 rounded-2xl shadow-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h3 className="text-base font-bold text-white">
              {isEdit ? "Edit" : "Add New"} {sectionConfig?.singular}
            </h3>
            <p className="text-[11px] text-white/50">
              Fill in the required information. Updates are saved immediately.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Universal Title / Name Field */}
          {section !== "alumni" && section !== "startups" && section !== "corecommittee" && (
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                Title / Name *
              </label>
              <input
                type="text"
                required
                value={formData.title || formData.event || ""}
                onChange={(e) => {
                  handleChange("title", e.target.value);
                  handleChange("event", e.target.value);
                }}
                placeholder="e.g. Autonomous Multi-Rotor UAV"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>
          )}

          {/* Dedicated Name for Committee, Alumni, Startups */}
          {(section === "corecommittee" || section === "alumni" || section === "startups") && (
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                {section === "startups" ? "Startup Name *" : "Full Name *"}
              </label>
              <input
                type="text"
                required
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder={section === "startups" ? "e.g. Koolgen Interactives" : "e.g. Jayanth Potluri"}
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>
          )}

          {/* Two-Column Grid: Categories & Date/Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category or Designation */}
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                {section === "corecommittee"
                  ? "Designation / Role *"
                  : section === "alumni"
                  ? "Current Designation *"
                  : "Category / Domain *"}
              </label>
              <input
                type="text"
                required
                value={
                  formData.categories ||
                  formData.category ||
                  formData.designation ||
                  ""
                }
                onChange={(e) => {
                  handleChange("categories", e.target.value);
                  handleChange("category", e.target.value);
                  handleChange("designation", e.target.value);
                }}
                placeholder="e.g. Robotics, President, or Healthcare"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>

            {/* Date or Year */}
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                {section === "corecommittee"
                  ? "Committee Year *"
                  : section === "alumni"
                  ? "Graduation Year *"
                  : section === "books" || section === "publications"
                  ? "Publication Year *"
                  : "Date / Period *"}
              </label>
              <input
                type="text"
                required
                value={
                  formData.year ||
                  formData.graduationYear ||
                  formData.date ||
                  formData.publishedAt ||
                  formData.establishedDate ||
                  ""
                }
                onChange={(e) => {
                  handleChange("year", e.target.value);
                  handleChange("graduationYear", e.target.value);
                  handleChange("date", e.target.value);
                  handleChange("publishedAt", e.target.value);
                  handleChange("establishedDate", e.target.value);
                }}
                placeholder="e.g. 2025 or OCTOBER 2024"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>
          </div>

          {/* Section Specific Fields */}
          {section === "corecommittee" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department || ""}
                  onChange={(e) => handleChange("department", e.target.value)}
                  placeholder="e.g. CSE, IT, ECE"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.linkedin || ""}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>
            </div>
          )}

          {section === "alumni" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company || ""}
                  onChange={(e) => handleChange("company", e.target.value)}
                  placeholder="e.g. Google Cloud, Microsoft"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  Current Location
                </label>
                <input
                  type="text"
                  value={formData.currentLocation || ""}
                  onChange={(e) => handleChange("currentLocation", e.target.value)}
                  placeholder="e.g. Bengaluru, India"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>
            </div>
          )}

          {section === "patents" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  Application Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.applicationNumber || ""}
                  onChange={(e) => handleChange("applicationNumber", e.target.value)}
                  placeholder="e.g. 201941002559"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  Short Display Title
                </label>
                <input
                  type="text"
                  value={formData.shortTitle || ""}
                  onChange={(e) => handleChange("shortTitle", e.target.value)}
                  placeholder="e.g. Automated Pill Reminder Device"
                  className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
                />
              </div>
            </div>
          )}

          {/* List Fields (Authors / Inventors / Contributors) */}
          {(section === "publications" ||
            section === "patents" ||
            section === "books" ||
            section === "projects" ||
            section === "startups") && (
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">
                {section === "patents"
                  ? "Inventors (comma-separated)"
                  : section === "startups"
                  ? "Founders (comma-separated)"
                  : section === "projects"
                  ? "Team Contributors (comma-separated)"
                  : "Authors (comma-separated)"}
              </label>
              <input
                type="text"
                value={
                  Array.isArray(formData.authors)
                    ? formData.authors.join(", ")
                    : Array.isArray(formData.inventors)
                    ? formData.inventors.join(", ")
                    : Array.isArray(formData.founders)
                    ? formData.founders.join(", ")
                    : Array.isArray(formData.names)
                    ? formData.names.join(", ")
                    : formData.authors ||
                      formData.inventors ||
                      formData.founders ||
                      formData.names ||
                      ""
                }
                onChange={(e) => {
                  handleChange("authors", e.target.value);
                  handleChange("inventors", e.target.value);
                  handleChange("founders", e.target.value);
                  handleChange("names", e.target.value);
                }}
                placeholder="e.g. Jayanth Potluri, Steven Gopaldas"
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>
          )}

          {/* Image URL & Instant Preview */}
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1.5">
              Image / Media URL
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={
                  formData.mainImageUrl ||
                  formData.image ||
                  formData.cover ||
                  formData.img ||
                  formData.mainImage ||
                  ""
                }
                onChange={(e) => {
                  handleChange("mainImageUrl", e.target.value);
                  handleChange("image", e.target.value);
                  handleChange("cover", e.target.value);
                  handleChange("img", e.target.value);
                  handleChange("mainImage", e.target.value);
                }}
                placeholder="https://... or /images/..."
                className="flex-1 bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
              />
              {previewImg && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/15 bg-black/50 shrink-0">
                  <img
                    src={previewImg}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Links (GitHub, Website, Paper Link) */}
          {(formData.githubRepo !== undefined ||
            formData.website !== undefined ||
            formData.paperLink !== undefined ||
            section === "projects" ||
            section === "publications" ||
            section === "startups") && (
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1.5">
                {section === "projects"
                  ? "GitHub Repository URL"
                  : section === "publications"
                  ? "Paper / DOI Link"
                  : "External Website URL"}
              </label>
              <input
                type="url"
                value={
                  formData.githubRepo ||
                  formData.website ||
                  formData.paperLink ||
                  ""
                }
                onChange={(e) => {
                  handleChange("githubRepo", e.target.value);
                  handleChange("website", e.target.value);
                  handleChange("paperLink", e.target.value);
                }}
                placeholder="https://..."
                className="w-full bg-[#08090C] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C]"
              />
            </div>
          )}

          {/* Description / Content Body */}
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1.5">
              Description / Content Body *
            </label>
            <textarea
              required
              rows={4}
              value={
                formData.description ||
                formData.content ||
                formData.abstract ||
                formData.bio ||
                formData.mission ||
                ""
              }
              onChange={(e) => {
                handleChange("description", e.target.value);
                handleChange("content", e.target.value);
                handleChange("abstract", e.target.value);
                handleChange("bio", e.target.value);
                handleChange("mission", e.target.value);
              }}
              placeholder="Provide complete details, summary, or background for this entry..."
              className="w-full bg-[#08090C] border border-white/15 rounded-xl p-3 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#E5A93C] leading-relaxed resize-y"
            />
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 sticky bottom-0 bg-[#111318] py-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#1255D1] text-xs font-bold text-white transition-all shadow-md shadow-[#E5A93C]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaCheck />
                  <span>Save {sectionConfig?.singular}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
