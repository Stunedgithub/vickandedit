import React from 'react';

export default function HomePage() {
  return (
    <main className="bg-[#f9f8fa] min-h-screen text-[#222] w-full">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <span className="text-[1.7rem] font-bold text-[#464fc3]">Vick and Edit</span>
          {/* Navigation */}
          <nav className="ml-10 flex gap-8 text-[1rem] font-medium text-[#222]">
            <span className="hover:text-[#464fc3] cursor-pointer">Design options</span>
            <span className="hover:text-[#464fc3] cursor-pointer">Business</span>
            <span className="hover:text-[#464fc3] cursor-pointer">Education</span>
            <span className="hover:text-[#464fc3] cursor-pointer">Plans</span>
            <span className="hover:text-[#464fc3] cursor-pointer">Learn</span>
          </nav>
        </div>
        <div className="flex gap-4 items-center">
          <button className="py-2 px-5 rounded font-medium hover:bg-[#f1effe]">Log in</button>
          <button className="bg-[#464fc3] py-2 px-5 rounded text-white font-semibold hover:bg-[#3c43a1]">Sign up</button>
        </div>
      </header>
      {/* Hero section */}
      <section className="container mx-auto pt-20 pb-10 flex flex-col items-center">
        <h1 className="text-5xl font-bold font-[inherit] mb-5 text-center">
          What will you <span className="text-[#16b8c5]">design</span> today?
        </h1>
        <p className="text-lg text-[#464fc3] font-medium mb-7 text-center max-w-xl">With Vick and Edit you can design, generate, print, and work on anything.</p>
        <div className="flex gap-4 mb-8">
          <button className="bg-[#464fc3] text-white px-6 py-2 rounded text-lg font-semibold shadow hover:bg-[#3c43a1]">Start designing</button>
          <button className="bg-[#f2eafa] text-[#464fc3] px-6 py-2 rounded text-lg font-semibold hover:bg-[#ece6f6]">Browse templates</button>
        </div>
        {/* Template slider placeholder */}
        <div className="w-full flex gap-4 mt-8 overflow-x-auto pb-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="min-w-[160px] h-[210px] bg-white rounded-lg shadow text-center flex flex-col items-center justify-center border border-[#eee]">
              <div className="w-24 h-24 bg-[#e6eaff] rounded-full mb-4"></div>
              <span className="font-semibold">Template {i+1}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Fit for everyone section */}
      <section className="py-12 px-2 bg-[#f9f8fa] text-center">
        <h2 className="text-3xl font-bold mb-8">A perfect fit for everyone</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {[
            {title: 'Vick Free', desc: 'For designing or working on anything.'},
            {title: 'Vick Pro', desc: 'Grow your brand or project with premium features.'},
            {title: 'Vick Teams', desc: 'Teams create together with pro tools.'},
            {title: 'Vick Enterprise', desc: 'Unite and manage your teams, brands, and designs.'}
          ].map(({title, desc}) => (
            <div key={title} className="w-[260px] bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-[#ededfb]">
              <span className="font-bold text-lg mb-2">{title}</span>
              <p className="text-[#555] mb-3">{desc}</p>
              <button className="bg-[#e6eaff] px-4 py-2 rounded font-medium hover:bg-[#d2d9fa] text-[#464fc3]">Get started</button>
            </div>
          ))}
        </div>
        <small className="text-[#888]">See our <a className="text-[#464fc3] underline" href='#'>pricing</a> for details. Educational orgs and nonprofits can unlock premium features for free.</small>
      </section>
      {/* Templates gallery */}
      <section className="py-12 px-2 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Templates for absolutely anything</h2>
        <p className="text-center text-[#333] mb-8">Customize a template, or make something more personal, like an invitation.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-5xl mx-auto mb-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-40 bg-[#e6eaff] rounded-lg shadow flex items-center justify-center text-2xl font-bold text-[#464fc3]">Template</div>
          ))}
        </div>
        <div className="text-center">
          <button className="bg-[#464fc3] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3c43a1]">Browse all templates</button>
        </div>
      </section>
      {/* Feature promos (AI, Collaboration, Print) */}
      <section className="py-16 px-2 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        <div>
          <h3 className="text-2xl font-bold mb-2">Create with AI</h3>
          <p className="mb-6">Redefine your creativity with our suite of AI-powered tools. Generate content and transform your projects with Magic Write and Magic Edit.</p>
          <button className="bg-[#464fc3] text-white px-6 py-2 rounded font-semibold hover:bg-[#3c43a1] mb-6">See AI features</button>
        </div>
        <div className="h-60 bg-[#e6eaff] rounded shadow flex items-center justify-center">[AI Images]</div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Design with others</h3>
          <p className="mb-6">Invite teammates, friends, and family to collaborate on projects in real time. Leave comments, edit together, and keep work smooth and creative.</p>
          <button className="bg-[#464fc3] text-white px-6 py-2 rounded font-semibold hover:bg-[#3c43a1] mb-6">Start collaborating</button>
        </div>
        <div className="h-60 bg-[#e6eaff] rounded shadow flex items-center justify-center">[Collaboration image]</div>
      </section>
      {/* Print promo section */}
      <section className="py-12 px-2 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        <div className="h-52 bg-[#e6eaff] rounded shadow flex items-center justify-center mb-6 md:mb-0">[Print Products Image]</div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Design and print in one place</h3>
          <p className="mb-6">Turn your designs into T-shirts, business cards, flyers or photo albums. Print your creations with doorstep delivery.</p>
          <button className="bg-[#464fc3] text-white px-6 py-2 rounded font-semibold hover:bg-[#3c43a1]">Print your creation</button>
        </div>
      </section>
      {/* Plans section */}
      <section className="py-16 px-2 bg-[#f9f8fa] text-center">
        <h2 className="text-3xl font-bold mb-4">Plans that get down to business</h2>
        <div className="flex justify-center mt-8">
          <div className="w-[420px] h-56 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center gap-2 p-6 border border-[#ededfb]">
            <div className="w-full h-24 bg-[#e6eaff] mb-3 rounded"></div>
            <span className="font-bold text-xl">AI-powered efficiency</span>
            <p className="text-[#666]">Leverage AI to create templates and designs at speed and scale. Streamline your team's workflow and unlock new possibilities.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 my-12">
          {[...Array(6)].map((_, i) => (<div key={i} className="w-24 h-10 bg-[#e6eaff] rounded-lg mx-2"></div>))}
        </div>
      </section>
      {/* New world of work section */}
      <section className="py-14 px-2">
        <div className="rounded-2xl bg-gradient-to-r from-[#b3469e] via-[#464fc3] to-[#16b8c5] py-16 px-10 text-white max-w-5xl mx-auto flex flex-col items-start">
          <h2 className="text-4xl font-bold mb-2">A new world of work is here</h2>
          <p className="mb-6 max-w-xl">From fresh sheets to AI-powered Actions, discover our latest launches to set a new course for how you work.</p>
          <button className="bg-white text-[#464fc3] px-8 py-2 rounded-lg font-bold hover:bg-[#ece6f6]">Discover Vick's Suite</button>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#f9f8fa] border-t border-[#ece6f6] text-[#555] pt-12 pb-6 px-4 mt-8 grid grid-cols-2 md:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            <div className="font-bold mb-2">Feature {i+1}</div>
            <ul className="flex flex-col gap-2">
              {[...Array(6)].map((_, j) => (
                <li key={j} className="hover:text-[#464fc3] cursor-pointer text-sm">Link {j+1}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-5 mt-6 text-xs flex flex-col items-center justify-center w-full">
          <div className="flex gap-3 mb-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-[#e6eaff] rounded-full"></div>
            ))}
          </div>
          <span>© 2025 Vick and Edit. All Rights Reserved.</span>
        </div>
      </footer>
    </main>
  );
}
