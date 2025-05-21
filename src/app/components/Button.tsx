export const Button = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="bg-[#01CC74] text-white p-4 rounded-md font-medium shadow hover:bg-[#00b27f] transition-colors w-36 h-14 text-sm cursor-pointer">
            {children}
        </button>
    );
};