import { EXPERIENCES } from "../constants"
import {motion} from 'framer-motion';

const Experience = () => {
  return (
    <div id="experience" className="border-b border-neutral-900 pb-4">
        <h2 className="my-20 text-center text-4xl">Experience</h2>
        {EXPERIENCES.map((experience, index) => (
            <div key={index} className="mb-8 flex flex-wrap  lg:justify-center">
                <motion.div 
                    initial={{x:-100, opacity:0}}
                    whileInView={{x:0, opacity:1}}
                    className="w-full lg:w-1/4">
                    <p className="mb-2 text-xl text-black">{experience.year}</p>
                </motion.div>
                <motion.div 
                    initial={{x:100, opacity:0}}
                    whileInView={{x:0, opacity:1}}
                    className="w-full max-w-xl lg:w-3/4">
                    <h6 className="mb-2 font-semibold">
                        {experience.role} - <span className="text-sm text-red-600">{experience.company}</span>
                    </h6>
                    <div className="mb-4 text-neutral-700 ">
                        {experience.description}
                    </div>
                    {experience.technologies.map((technology, index)=>(
                        <span key={index} className="mr-2 mt-4 rounded 
                        bg-red-600 px-2 py-1 text-sm font-medium text-white">
                            {technology}
                        </span>
                    ))}
                </motion.div>
            </div>
        ))}
    </div>
  )
}

export default Experience