"use client";

import { useState, useEffect } from "react";
import { auth, db, uploadToFirebase } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { MOCK_TEAM, TeamMember } from "@/app/people/data";
import Image from "next/image";
import { Trash2, Edit2, Plus, Upload, Loader2, Save, X } from "lucide-react";

export default function PeopleAdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isEditing, setIsEditing] = useState<TeamMember | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user !== null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!db || !isAdmin) return;
    const unsub = onSnapshot(collection(db, "team"), (snapshot) => {
      const teamData = snapshot.docs.map(doc => ({ ...doc.data() } as TeamMember));
      // Sort by category or name if needed. For now, just load them.
      setTeam(teamData);
    });
    return () => unsub();
  }, [isAdmin]);

  const handleMigrate = async () => {
    if (!confirm("Are you sure you want to migrate the hardcoded MOCK_TEAM data to Firestore? This will overwrite existing records with the same IDs.")) return;
    setIsMigrating(true);
    try {
      for (const member of MOCK_TEAM) {
        await setDoc(doc(db, "team", member.id), member, { merge: true });
      }
      alert("Migration complete!");
    } catch (err) {
      console.error(err);
      alert("Migration failed.");
    } finally {
      setIsMigrating(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;
    
    // Auto-generate ID if it's a new user and missing an ID
    const memberId = isEditing.id || isEditing.name.toLowerCase().replace(/\s+/g, '-');
    const memberToSave = { ...isEditing, id: memberId };

    try {
      await setDoc(doc(db, "team", memberId), memberToSave, { merge: true });
      setIsEditing(null);
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Failed to save member");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await deleteDoc(doc(db, "team", id));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete member");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isEditing) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, etc.)');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      alert('File size must be less than 15MB');
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadToFirebase(file, 'team-assets');
      setIsEditing({ ...isEditing, imageUrl: url });
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAdmin) {
    return <div className="min-h-screen bg-[#000d0a] text-white flex items-center justify-center">Please log in to access the CMS.</div>;
  }

  return (
    <main className="min-h-screen bg-[#000d0a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">Team Member CMS</h1>
            <p className="text-white/60 font-sans">Manage profiles for the People page and Digital Business Cards.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleMigrate}
              disabled={isMigrating}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isMigrating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Migrate Mock Data
            </button>
            <button 
              onClick={() => setIsEditing({
                id: '', name: '', title: '', category: 'Strategic Advisor', bio: '', fullBio: '', imageUrl: ''
              })}
              className="px-4 py-2 bg-[#98cc67] hover:bg-white text-[#001b15] rounded-lg flex items-center gap-2 font-bold transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Team Member
            </button>
          </div>
        </div>

        {/* List View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(member => (
            <div key={member.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4 items-center">
              <div className="w-16 h-16 rounded-full bg-white/10 overflow-hidden relative shrink-0">
                {member.imageUrl && (
                  <Image src={member.imageUrl} alt={member.name} fill className="object-cover" unoptimized />
                )}
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-lg text-white truncate">{member.name}</h3>
                <p className="text-white/50 text-sm truncate">{member.title}</p>
                <span className="inline-block mt-1 text-[10px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/70">
                  {member.category}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setIsEditing(member)} className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(member.id)} className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#001b15] border border-white/10 rounded-2xl max-w-2xl w-full p-8 my-8 relative">
            <button onClick={() => setIsEditing(null)} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              {isEditing.id ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="flex gap-6">
                <div className="w-32 flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden flex items-center justify-center group">
                    {isEditing.imageUrl ? (
                      <Image src={isEditing.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                    ) : (
                      <Upload className="w-8 h-8 text-white/30" />
                    )}
                    <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-xs font-bold text-white">
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Change Photo'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
                
                <div className="flex-grow space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Full Name</label>
                      <input required type="text" value={isEditing.name} onChange={e => setIsEditing({...isEditing, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#98cc67]" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Title</label>
                      <input required type="text" value={isEditing.title} onChange={e => setIsEditing({...isEditing, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#98cc67]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Category</label>
                    <select required value={isEditing.category} onChange={e => setIsEditing({...isEditing, category: e.target.value as any})} className="w-full bg-[#001b15] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#98cc67] appearance-none">
                      <option>Executive</option>
                      <option>Practice Leader</option>
                      <option>Client Success</option>
                      <option>Strategic Advisor</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Short Bio (Card Preview)</label>
                  <textarea required rows={2} value={isEditing.bio} onChange={e => setIsEditing({...isEditing, bio: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#98cc67] resize-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Full Bio (Profile Page)</label>
                  <textarea required rows={4} value={isEditing.fullBio} onChange={e => setIsEditing({...isEditing, fullBio: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#98cc67] resize-none" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold text-white mb-2">Contact & Social (Optional)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Email</label>
                    <input type="email" value={isEditing.email || ''} onChange={e => setIsEditing({...isEditing, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#98cc67]" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Phone</label>
                    <input type="tel" value={isEditing.phone || ''} onChange={e => setIsEditing({...isEditing, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#98cc67]" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">LinkedIn URL</label>
                    <input type="url" value={isEditing.linkedinUrl || ''} onChange={e => setIsEditing({...isEditing, linkedinUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#98cc67]" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Calendar URL</label>
                    <input type="url" value={isEditing.calendarUrl || ''} onChange={e => setIsEditing({...isEditing, calendarUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#98cc67]" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button type="button" onClick={() => setIsEditing(null)} className="px-6 py-2 text-white hover:text-white/70 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isUploading} className="px-6 py-2 bg-[#98cc67] hover:bg-white text-[#001b15] rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50">
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
