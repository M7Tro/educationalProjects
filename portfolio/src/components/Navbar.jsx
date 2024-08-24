const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
        <div className=" flex items-center justify-center gap-4 text-2xl absolute top-10">
            <a className="hover:text-red-600 hover:border-b-4 border-red-600 duration-150" href="#experience">Experience</a>
            <a className="hover:text-red-600 hover:border-b-4 border-red-600 duration-150" href="#projects">Projects </a>
        </div>
    </nav>
  )
}

export default Navbar