import {
  FolderKanban,
  ArrowUpRight,
} from "lucide-react";


const ProjectsWork = () => {


  const projects = [
    {
      title: "OneWinq Platform",
      category: "Digital Identity Platform",
      description:
        "A platform helping companies and professionals create, manage and share their digital presence.",
    },

    {
      title: "Professional Profile System",
      category: "Identity Management",
      description:
        "Creating structured profiles for founders, teams and individual professionals.",
    },

    {
      title: "Company Management Dashboard",
      category: "Business Solution",
      description:
        "An admin system to manage teams, roles, products and company information.",
    },

  ];



  return (
    <section
      className="
        bg-white
        py-16
        sm:py-20
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          sm:px-8
        "
      >



        {/* Heading */}

        <div
          className="
            max-w-3xl
          "
        >

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
              text-purple-700
            "
          >
            Projects & Work
          </p>


          <h2
            className="
              mt-4
              text-3xl
              font-bold
              text-slate-900
              sm:text-4xl
            "
          >
            Building impactful solutions.
          </h2>


          <p
            className="
              mt-4
              text-base
              leading-7
              text-slate-600
              sm:text-lg
            "
          >
            Explore the projects and initiatives that represent
            our innovation, vision and technical capabilities.
          </p>


        </div>






        {/* Project Cards */}

        <div
          className="
            mt-12
            grid
            gap-6
            lg:grid-cols-3
          "
        >


          {
            projects.map((project)=>(

              <div
                key={project.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-[#F8F8F6]
                  p-6
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >


                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-purple-100
                    text-purple-700
                  "
                >

                  <FolderKanban size={23}/>

                </div>




                <p
                  className="
                    mt-5
                    text-sm
                    font-medium
                    text-purple-700
                  "
                >
                  {project.category}
                </p>




                <h3
                  className="
                    mt-2
                    text-xl
                    font-bold
                    text-slate-900
                  "
                >
                  {project.title}
                </h3>




                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-slate-600
                  "
                >
                  {project.description}
                </p>




                <button
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-purple-700
                    transition
                    group-hover:gap-3
                  "
                >

                  View Project

                  <ArrowUpRight size={16}/>

                </button>


              </div>

            ))
          }


        </div>



      </div>


    </section>
  );
};


export default ProjectsWork;