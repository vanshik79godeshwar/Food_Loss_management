import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
		<div className="h-10 bg-black flex justify-between items-center py-8 px-6">
			<div className="logo bg-black text-white flex items-center gap-6">
				<Image
					src="https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo.png"
					alt="company-logo"
					width={32}
          height={32}
          className='bg-black rounded-full'
        />
        <a href='/' className="text-white font-sans ">Company</a>

			</div>
			<div className="nav-links text-white">
				<ul className="flex justify-between items-center gap-6 py-2 px-6">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/cart">Cart</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
					<li>
						<Link href="/contact">Contact</Link>
					</li>
				</ul>
			</div>
		</div>
  );
}

export default Navbar
