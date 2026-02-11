

export default function AppLogo() {
    return (
        <>
            <div className="flex size-10 items-center justify-center rounded-full bg-sidebar-primary overflow-hidden">
                <img
                    src="/appImg/Logo.png"
                    alt="Logo"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold tracking-wide">
                    WELCOME
                </span>
            </div>
        </>
    );
}
