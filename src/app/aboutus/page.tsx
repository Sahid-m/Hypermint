const Page = () => {
    return(
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
        <main className="pt-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500 mb-8">
            About Us
          </h1>
        </div>
        <div className="mx-auto w-1/2">
        <p>
        Welcome to our token creation and deployment platform! We are a team of three passionate students dedicated to simplifying the
        process of bringing tokens to life. Our mission is to make token development accessible to everyone, whether you're an experienced
         developer or just beginning your journey in the world of blockchain technology. <br/>
        With expertise in blockchain, smart contracts, and decentralized technologies, we focus on delivering a seamless and user-friendly
        experience. We believe that tokenization has the potential to transform industries, empower communities, and foster innovation.
        That’s why we're committed to providing the tools and support needed to make token creation easy and efficient.<br/>
        Join us as we explore the exciting future of digital assets and build a world where everyone can harness the power of blockchain!
        </p>
        </div>
        </main>
    </div>
    )
}

export default Page;