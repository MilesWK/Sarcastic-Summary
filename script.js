var morph = gsap.to("#send", {
    duration: 1, 
    paused: true, 
    yoyo: true,
    stagger: 0.1,
    repeatDelay: 0.2,
    ease: 'power3.out', 
    morphSVG: "#check", 
    onComplete: () => {
        morph.reverse()
    }
});

// Create a timeline


let tl = gsap.timeline({ repeat: -1, stagger: 0.1, }); // repeat: -1 means infinite

// First animation
tl.to(".loader", { y: -20, duration: 0.5, stagger: 0.1, ease: 'back.out', delay: 0, rotate: '+=90'})

  // Second animation starts after the first finishes
  .to(".loader", { y: 0, ease: 'bounce.out', duration: 1 });

sendMessage = async function() {
    // sometimes the easy way isn't the best way...
    const loader = document.getElementById("loader")
    const loader2 = document.getElementById("loader2")
    const loader3 = document.getElementById("loader3")
    const errorMessage = document.getElementById("errmsg")
    

    const message = document.getElementById('msg').value;
    if (message === "" || message === " " || !message.includes("http")) {
      errorMessage.classList.remove('hidden');
    } else {
      errorMessage.classList.add('hidden')
      loader.classList.toggle('hidden');
    loader2.classList.toggle('hidden');
    loader3.classList.toggle('hidden');
    morph.restart()
    const res = await fetch(`https://sarcasticsummarybackend.vercel.app/api/aibackend?url=${encodeURIComponent(message)}`);
    console.log(res)
    const data = await res.json();
    console.log(data)
    document.getElementById('result').innerHTML = data.result;

    loader.classList.toggle('hidden');
    loader2.classList.toggle('hidden');
    loader3.classList.toggle('hidden');}

}

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(DrawSVGPlugin,MorphSVGPlugin)
  // gsap code here!
 });
