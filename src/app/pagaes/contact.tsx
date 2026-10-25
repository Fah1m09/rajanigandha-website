const branches = ["Main Branch", "Chittagong Branch", "Sylhet Branch"];

export default function Contact() {
  return (
    <main className="container-area space-y-10">
      <section className="contact-heading-container">
        <h1>Get In Touch</h1>
        <p>If you have any queries feel free to connect with us</p>
      </section>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="contact-box-large"><span className="rounded-icon-border">☎</span><h5>Call Us On</h5><p>01730376269</p><p>01777799333</p></article>
        <article className="contact-box-large"><span className="rounded-icon-border">✉</span><h5>Email Us</h5><p>rajani@dhaka.net</p></article>
        {branches.map((branch) => <article className="contact-box-small" key={branch}><span className="rounded-icon-border">⌖</span><h5>{branch}</h5><p>5/14, Eastern Commercial Complex</p><p>73 Kakrail, Dhaka 1000, Bangladesh</p></article>)}
      </section>
      <section className="space-y-4">
        <div className="contact-heading-container"><h1>Our Branches &amp; Distributors</h1><p>We have lots of branches and distributors all across the country</p></div>
        <iframe title="Our branches and distributors" className="h-72 w-full sm:h-[26rem]" src="https://www.google.com/maps/d/u/0/embed?mid=1k3k6XWGeh56dGbTpKaH4BxWA82TUQA5B&ehbc=2E312F" />
      </section>
      <section className="space-y-4">
        <div className="contact-heading-container"><h1>Send Us A Message</h1><p>We would love to hear from you!</p></div>
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          {[["Name", "text"], ["Email", "email"], ["Subject", "text"]].map(([label, type]) => <label className="block" key={label}><span className="mb-1 block">{label}</span><input className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 focus:outline-2 focus:outline-blue-600" name={label} type={type} /></label>)}
          <label className="block"><span className="mb-1 block">Message</span><textarea className="w-full rounded border border-slate-300 bg-transparent px-3 py-2 focus:outline-2 focus:outline-blue-600" name="Message" rows={4} /></label>
          <button className="w-full rounded bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800" type="submit">Submit</button>
        </form>
      </section>
    </main>
  );
}
