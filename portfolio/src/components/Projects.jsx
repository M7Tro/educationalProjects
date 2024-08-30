import {PROJECTS} from '../constants/index.js';
import {motion} from 'framer-motion';
import { FaGithub } from "react-icons/fa";


const Projects = () => {
  return (
    <div id='projects' className="border-b border-neutral-900 pb-4">
        <h2 className="my-20 text-center text-4xl">Projects</h2>
        <div className='flex flex-col items-center'>
            {PROJECTS.map((project, index) => (
                <motion.div 
                    initial={{opacity:0, y:100}}
                    whileInView={{opacity:1, y:0}}
                    transition={{duration:.7}}
                    key={index} className='mb-8 flex flex-nowrap lg:justify-center lg:items-center 
                    w-3/5 border-4 border-black rounded-lg bg-white p-3'>

                    {/**Project Image: */}
                    <div className="w-fit h-fit mr-10">
                        <img src={project.image} width={300} height={300} alt={project.title} 
                        className='m-4'/>
                    </div>

                    {/**Project info */}
                    <div className="w-full max-w-xl lg:w-3/4">
                        <h1 className='mb-2 text-xl font-semibold'>{project.title}</h1>
                        <p className='mb-4 text-neutral-700'>{project.description}</p>
                        {project.technologies.map((technology, index) => (
                            <span className='mr-2 rounded bg-red-600 px-2 py-1 text-sm font-medium text-white' 
                            key={index}>
                                {technology}
                            </span>
                        ))}
                            <a className="flex text-4xl items-center align-center mt-6 cursor-pointer w-fit gap-4
                                border-4 border-black p-2 rounded-full hover:text-red-600 duration-300" href={"#"}>
                                <FaGithub/>
                                <p className='text-xl font-semibold'>View Source</p>                            
                            </a>                              
                    </div>  

                </motion.div>
            ))}
        </div>
    </div>
  )
}

export default Projects