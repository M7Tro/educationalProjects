import {PROJECTS} from '../constants/index.js';
import {motion} from 'framer-motion';

const Projects = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
        <h2 className="my-20 text-center text-4xl">Projects</h2>
        <div className="">
            {PROJECTS.map((project, index) => (
                <motion.div 
                    initial={{opacity:0, y:100}}
                    whileInView={{opacity:1, y:0}}
                    transition={{duration:.7}}
                    key={index} className='mb-8 flex flex-wrap lg:justify-center'>
                    <div className="w-full lg:w-1/4">
                        <img src={project.image} width={150} height={150} alt={project.title} 
                        className='mb-6  rounded'/>
                    </div>
                    <div className="w-full max-w-xl lg:w-3/4">
                        <h6 className='mb-2 font-semibold'>{project.title}</h6>
                        <p className='mb-4 text-neutral-400'>{project.description}</p>
                        {project.technologies.map((technology, index) => (
                            <span className='mr-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-900' 
                            key={index}>{technology}</span>
                        ))}
                    </div>  
                </motion.div>
            ))}
        </div>
    </div>
  )
}

export default Projects