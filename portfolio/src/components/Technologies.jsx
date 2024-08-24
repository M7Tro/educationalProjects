import {RiReactjsLine} from 'react-icons/ri';
import {TbBrandNextjs} from 'react-icons/tb';
import {SiMongodb} from 'react-icons/si';
import {DiRedis} from 'react-icons/di';
import {FaNodeJs} from 'react-icons/fa';
import {BiLogoPostgresql } from "react-icons/bi";
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
                <TbBrandNextjs className='text-7xl'/>
            </motion.div>
            <motion.div 
                variants={iconVariants(2, 0.5)}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-4 border-neutral-800 p-4">
                <SiMongodb className='text-7xl text-green-500'/>
            </motion.div>
            <motion.div 
                variants={iconVariants(2, 1)}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-4 border-neutral-800 p-4">
                <DiRedis className='text-7xl text-red-700'/>
            </motion.div>
            <motion.div 
                variants={iconVariants(2, 1.5)}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-4 border-neutral-800 p-4">
                <FaNodeJs className='text-7xl text-green-500'/>
            </motion.div>
            <motion.div 
                variants={iconVariants(2, 2)}
                initial="initial"
                animate="animate"
                className="rounded-2xl border-4 border-neutral-800 p-4">
                <BiLogoPostgresql className='text-7xl text-sky-700'/>
            </motion.div>
        </div>
    </div>
  )
}

export default Technologies