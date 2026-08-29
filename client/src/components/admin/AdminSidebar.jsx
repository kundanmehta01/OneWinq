import {
  LayoutDashboard,
  Building2,
  Users,
  Layers,
  FileText,
  Navigation,
  ShieldCheck,
  Package,
  FolderKanban,
  Trophy,
  Bell,
  BarChart3,
  History,
  Settings,
  ChevronRight,
} from "lucide-react";


const AdminSidebar = () => {

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "Company",
      icon: Building2,
      children: [
        "Company Settings",
        "Branding",
      ],
    },

    {
      title: "Organization",
      icon: Layers,
    },

    {
      title: "Team",
      icon: Users,
      children: [
        "Manage Team",
        "Add Member",
      ],
    },

    {
      title: "Templates",
      icon: FileText,
    },

    {
      title: "Sections",
      icon: Layers,
    },

    {
      title: "Navigation",
      icon: Navigation,
    },

    {
      title: "Access Control",
      icon: ShieldCheck,
    },

    {
      title: "Products",
      icon: Package,
    },

    {
      title: "Projects",
      icon: FolderKanban,
    },

    {
      title: "Achievements",
      icon: Trophy,
    },

    {
      title: "Updates",
      icon: Bell,
    },

    {
      title: "Analytics",
      icon: BarChart3,
    },

    {
      title: "Audit Logs",
      icon: History,
    },

    {
      title: "Settings",
      icon: Settings,
    },
  ];


  return (
    <aside
      className="
        fixed
        left-0
        top-0
        hidden
        h-screen
        w-64
        border-r
        border-slate-200
        bg-white
        lg:block
      "
    >

      {/* Logo */}

      <div
        className="
          flex
          h-20
          items-center
          gap-3
          border-b
          border-slate-100
          px-6
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-purple-700
            text-white
            font-bold
          "
        >
          OW
        </div>


        <div>
          <h1 className="font-bold text-slate-900">
            OneWinq
          </h1>

          <p className="text-xs text-slate-400">
            Company Admin
          </p>
        </div>

      </div>



      {/* Menu */}

      <div
        className="
          h-[calc(100vh-80px)]
          overflow-y-auto
          px-4
          py-5
        "
      >

        <nav className="space-y-1">


          {menuItems.map((item) => {

            const Icon = item.icon;


            return (
              <div key={item.title}>


                <button
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    text-slate-600
                    transition-all
                    duration-200
                    hover:bg-purple-50
                    hover:text-purple-700
                  "
                >

                  <div className="flex items-center gap-3">

                    <Icon
                      size={18}
                      className="
                        text-slate-400
                        transition
                        group-hover:text-purple-700
                      "
                    />

                    <span>
                      {item.title}
                    </span>

                  </div>


                  {item.children && (
                    <ChevronRight
                      size={16}
                      className="text-slate-400"
                    />
                  )}

                </button>



                {/* Sub Menu */}

                {item.children && (

                  <div
                    className="
                      ml-9
                      mt-1
                      space-y-1
                    "
                  >

                    {item.children.map((child)=>(
                      
                      <button
                        key={child}
                        className="
                          block
                          w-full
                          rounded-lg
                          px-3
                          py-2
                          text-left
                          text-xs
                          text-slate-500
                          transition
                          hover:bg-purple-50
                          hover:text-purple-700
                        "
                      >
                        {child}
                      </button>

                    ))}


                  </div>

                )}


              </div>
            )

          })}


        </nav>

      </div>


    </aside>
  );
};


export default AdminSidebar;