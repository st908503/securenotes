import { CircleUserRound } from "lucide-react";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between rounded-t-xl bg-[#3b82f6] px-8 py-5">
      <h1 className="text-2xl font-semibold text-white">Secure Notes</h1>

      <div className="flex items-center gap-4">
        <button onClick={onLogout} className="text-lg font-medium text-white">
          Logout
        </button>

        <CircleUserRound size={42} className="text-white" />
      </div>
    </div>
  );
};

export default Navbar;
