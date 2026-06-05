const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl">
          ✕
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">User Details</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex justify-center">
            <img
              src={user.profile}
              alt={user.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-slate-700"
            />
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Name</p>
              <p className="text-white">{user.name}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Email</p>
              <p className="text-white">{user.email}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Contact</p>
              <p className="text-white">{user.contact}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">City</p>
              <p className="text-white">{user.city}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">State</p>
              <p className="text-white">{user.state}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Pincode</p>
              <p className="text-white">{user.pincode}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-slate-400 text-sm">Address</p>
              <p className="text-white">{user.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
