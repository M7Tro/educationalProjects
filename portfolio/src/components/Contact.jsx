import {CONTACT} from '../constants/index.js';
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="border-b border-neutral-900 pb-20">
        <h2 className="mt-10 text-center text-4xl">Get In Touch</h2>
        <div className="flex flex-col items-center text-center tracking-tighter ">
            <p className="my-4">{CONTACT.phoneNo}</p>
            <p className='border-b'>{CONTACT.email}</p>
            <div className='flex gap-10'>
              <a href={"#"  }><FaGithub className='text-5xl text-black mt-7'/></a>
              <a href={"#"}><FaLinkedin className='text-5xl text-sky-700 mt-7'/></a>              
            </div>

        </div>
    </div>
  )
}

export default Contact