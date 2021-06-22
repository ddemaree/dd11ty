function Layout({ children, gridwrap }) {
  return <div className="bg-surface text-ink min-h-screen dd-page grid grid-rows-base">
    {/* Header */}
    
    {gridwrap ? <div>{children}</div> : children}

    <footer className="py-10 flex flex-col items-center text-ink-medium">
      <hr className="w-full-inset border-2 border-ink-light mb-6"></hr>
    </footer>
  </div>
}

export default Layout