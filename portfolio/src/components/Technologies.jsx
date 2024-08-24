import {RiReactjsLine} from 'react-icons/ri';
import { SiLangchain } from "react-icons/si";
import { SiSpring } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import { SiGnubash } from "react-icons/si";



import {motion} from 'framer-motion';

const iconVariants = (duration, delay) => ({
    initial: {y:-15},
    animate: 
        {y:[15,-15], 
        transition: {duration: duration, delay:delay, ease: "linear", repeat: Infinity, repeatType: "reverse"}},
}) 

const Technologies = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
        <h2 className="my-20 text-center text-4xl ">Technologies</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.div 
                variants={iconVariants(2, 0)}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-4 border-neutral-800 p-4">
                <RiReactjsLine className='text-7xl text-cyan-400'/>
            </motion.div>
            <motion.div 
                variants={iconVariants(2, 0.3)}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-4 border-neutral-800 p-4">
                <SiLangchain className='text-7xl text-green-900'/>
            </motion.div>
            <motion.div 
                variants={iconVariants(2, 0.5)}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-4 border-neutral-800 p-4">
                <SiSpring className='text-7xl text-green-500'/>
            </motion.div>
            <motion.div 
                variants={iconVariants(2, 1)}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-4 border-neutral-800 p-4">
                <FaGitAlt className='text-7xl text-orange-600'/>
            </motion.div>
            <motion.div 
                variants={iconVariants(2, 1.5)}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-4 border-neutral-800 p-4">
                <SiGnubash className='text-7xl text-zinc-500'/>
            </motion.div>
        </div>
    </div>
  )
}

export default Technologies