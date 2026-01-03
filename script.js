// --- 1. SETUP GSAP & LENIS SCROLL ---
gsap.registerPlugin(ScrollTrigger);
let lenis;
try {
  lenis = new Lenis({
    duration: 2.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
} catch (e) {}

const loaderPercent = document.querySelector(".loader-percent");
const progressbar = document.getElementById("progress");
const loader = document.getElementById("loader");
let loadValue = 0;

function updateLoader() {
  loadValue++;
  loaderPercent.textContent = loadValue + "%";
  progressbar.style.width = loadValue + "%";
  if (loadValue < 100) {
    requestAnimationFrame(updateLoader);
  } else {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => (loader.style.display = "none"),
      });
      revealHero();
    }, 500);
  }
}
setTimeout(updateLoader, 30);

gsap.to(".scroll-progress", {
  width: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3,
  },
});

// --- 2. XỬ LÝ CON TRỎ CHUỘT ---
const cursor = document.getElementById("cursor");
let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  gsap.set(cursor, { left: cursorX, top: cursorY });
  requestAnimationFrame(animateCursor);
}
animateCursor();

function revealHero() {
  const tl = gsap.timeline();
  tl.to(
    "#heroTitle",
    { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" },
    "-=0.5"
  ).to(
    ".hero-subtitle",
    { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" },
    "-=1.0"
  );
}

if (document.querySelector(".hero-bg-container img")) {
  gsap.to(".hero-bg-container img", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

const revealHolders = document.querySelectorAll(".reveal-holder");
revealHolders.forEach((holder) => {
  ScrollTrigger.create({
    trigger: holder,
    start: "top 80%",
    end: "bottom 20%",
    toggleClass: "is-inview",
  });
});

document.querySelectorAll(".scrollable-text-box").forEach((text) => {
  gsap.from(text, {
    scrollTrigger: { trigger: text, start: "top 85%" },
    opacity: 0,
    y: 60,
    duration: 1.5,
    ease: "power4.out",
  });
});

function createHeroParticles() {
  const container = document.getElementById("heroParticles");
  const particleCount = 40; // Tăng số lượng hạt
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("golden-particle");
    // Tăng kích thước và độ sáng
    const size = Math.random() * 6 + 3 + "px";
    particle.style.backgroundColor =
      Math.random() > 0.5 ? "#FFD700" : "#FFFFFF";
    particle.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.8)";
    const left = Math.random() * 100 + "%";
    const duration = Math.random() * 15 + 10 + "s";
    const delay = Math.random() * 5 + "s";
    particle.style.width = size;
    particle.style.height = size;
    particle.style.left = left;
    particle.style.animationName = "floatUp";
    particle.style.animationDuration = duration;
    particle.style.animationDelay = delay;
    particle.style.animationTimingFunction = "linear";
    particle.style.animationIterationCount = "infinite";
    container.appendChild(particle);
  }
}
window.addEventListener("load", createHeroParticles);

// --- 3. THÊM HIỆU ỨNG VISUAL STORYTELLING (ENHANCED & EXPLOSIVE) ---

// 1. DI SẢN: Dải lụa bay (Sáng rực hơn)
gsap.to(".silk-ribbon", {
  xPercent: 80, // Di chuyển ít hơn để thấy rõ dải lụa
  ease: "none",
  scrollTrigger: {
    trigger: "#intro",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.2,
  },
});

// 2. LỊCH SỬ: Các năm tháng trôi (Rõ nét và phát sáng)
gsap.utils.toArray(".floating-year").forEach((year, i) => {
  const speed = year.getAttribute("data-speed");
  gsap.to(year, {
    y: -200 * speed, // Di chuyển xa hơn
    opacity: 1, // Rõ nét hoàn toàn
    scrollTrigger: {
      trigger: "#history",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
});
// Đồng hồ cát xoay nhanh hơn
gsap.to(".floating-hourglass", {
  rotation: 720,
  y: 100,
  opacity: 0.6,
  scrollTrigger: {
    trigger: "#history",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
  },
});

// 3. KỸ THUẬT: Con thoi dệt (Bùng nổ, nhanh như chớp)
const shuttleTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#technique",
    start: "top 70%", // Kích hoạt sớm hơn
    toggleActions: "restart none none reverse", // Chạy lại mỗi khi lướt qua
  },
});

shuttleTl
  .to(".shuttle-container", {
    left: "150%", // Bay xa hơn
    duration: 1.5, // Nhanh hơn nhiều (từ 2.5s xuống 1.5s)
    ease: "power4.inOut", // Gia tốc mạnh hơn
  })
  .to(
    ".shuttle-thread",
    {
      scaleX: 1,
      duration: 1.5,
      ease: "power4.inOut",
      opacity: 0, // Mờ dần ở cuối đường
    },
    "<0.1"
  );

// 4. DANH HIỆU: Mưa sao bùng nổ (Tạo nhiều sao bằng JS)
const starContainer = document.getElementById("star-container");
// Tạo 25 ngôi sao rơi thay vì vài ngôi sao tĩnh
for (let i = 0; i < 25; i++) {
  const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  star.setAttribute("viewBox", "0 0 24 24");
  star.setAttribute("fill", "currentColor");
  star.classList.add("falling-star");
  // Kích thước ngẫu nhiên lớn hơn
  const size = Math.random() * 30 + 15;
  star.style.width = size + "px";
  star.style.height = size + "px";
  // Vị trí ngẫu nhiên
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * -200 + "px"; // Bắt đầu cao hơn
  star.innerHTML =
    '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>';
  starContainer.appendChild(star);
}

gsap.utils.toArray(".falling-star").forEach((star, i) => {
  gsap.to(star, {
    y: window.innerHeight + 200, // Rơi hết màn hình
    rotation: Math.random() * 720, // Xoay nhiều vòng
    ease: "none",
    scrollTrigger: {
      trigger: "#awards",
      start: "top bottom",
      end: "bottom top",
      scrub: Math.random() * 1.5 + 0.5, // Tốc độ rơi đa dạng
    },
  });
});

// 5. BẢO TỒN: Kén tằm tỏa sáng (Chuyển động mềm mại hơn)
gsap.to(".cocoon-floating", {
  y: -40,
  rotation: 15,
  scale: 1.1, // Thêm hiệu ứng phồng lên nhẹ
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
gsap.to(".cocoon-floating", {
  yPercent: 30,
  scrollTrigger: {
    trigger: "#preservation",
    start: "top bottom",
    end: "bottom top",
    scrub: 2,
  },
});

// --- DỮ LIỆU GALLERY ---
const galleries = {
  // 1. DI SẢN
  intro: [
    {
      src: "img/cong-lang.jpg",
      title: "Cổng Làng Vạn Phúc",
      desc: "Biểu tượng chào đón du khách đến với không gian văn hóa nghìn năm. Cổng làng uy nghi với kiến trúc truyền thống, là ranh giới giữa phố thị ồn ào và không gian yên bình của làng nghề cổ.",
    },
    {
      src: "img/sac-mau.png",
      title: "Sắc Màu Làng Lụa",
      desc: "Không gian trưng bày với hàng trăm dải lụa đủ màu sắc rực rỡ, tạo nên một khung cảnh check-in tuyệt đẹp và đậm chất nghệ thuật.",
    },
    {
      src: "img/nghe-nhan.jpg",
      title: "Nghệ Nhân Làng Lụa",
      desc: "Những nghệ nhân tài hoa đang thực hiện công đoạn dệt lụa truyền thống, thể hiện sự tinh tế và kỹ thuật cao trong từng đường chỉ.",
    },
  ],
  // 2. LỊCH SỬ
  history: [
    {
      src: "img/nghe-nhan-den-trang.png",
      title: "Nghệ Nhân Dệt Lụa",
      desc: "Hình ảnh người nghệ nhân bên khung cửi truyền thống. Đôi bàn tay khéo léo điều khiển từng sợi tơ mảnh mai để tạo nên những tấm lụa bền đẹp.",
    },
    {
      src: "img/khung-cu.jpg",
      title: "Ký Ức Thời Gian",
      desc: "Những khung cửi cổ xưa vẫn được lưu giữ và hoạt động, là minh chứng sống động cho lịch sử phát triển lâu đời của làng nghề.",
    },
  ],
  // 3. KỸ THUẬT
  technique: [
    {
      src: "img/ẢNH LỤA.png",
      title: "Tinh Hoa Lụa Vân",
      desc: "Cận cảnh bề mặt tấm lụa Vân - đặc sản trứ danh. Các hoa văn chìm nổi tinh tế được tạo ra ngay trong quá trình dệt nhờ kỹ thuật điều khiển sợi tơ điêu luyện.",
    },
    {
      src: "img/t.jpg",
      title: "Sợi Tơ Vàng Óng",
      desc: "Nguyên liệu tơ tằm thượng hạng, khởi nguồn cho những tấm lụa mềm mại. Từng sợi tơ vàng như nắng được dệt nên bởi bàn tay tài hoa.",
    },
    {
      src: "img/mem-mai.jpg",
      title: "Sự Mềm Mại Tuyệt Đối",
      desc: "Đặc tính nổi bật của lụa Vạn Phúc là sự mềm mại, mát lạnh khi chạm vào, mang lại cảm giác dễ chịu cho người mặc.",
    },
  ],
  // 4. DANH HIỆU
  awards: [
    {
      src: "img/danh-hieu.jpg",
      title: "Di Sản Quốc Gia",
      desc: "Vạn Phúc vinh dự được công nhận là Di sản văn hóa phi vật thể quốc gia, khẳng định giá trị lịch sử và văn hóa bền vững.",
    },
    {
      src: "img/tay.jpg",
      title: "Thương Hiệu Quốc Tế",
      desc: "Sản phẩm lụa Vạn Phúc không chỉ nổi tiếng trong nước mà còn được bạn bè quốc tế đánh giá cao về chất lượng và tính thẩm mỹ.",
    },
  ],
  // 5. BẢO TỒN
  preservation: [
    {
      src: "img/hoc.png",
      title: "Truyền Nghề Thế Hệ Trẻ",
      desc: "Không chỉ giữ gìn những giá trị cũ, Vạn Phúc đang trẻ hóa với sự tham gia của thế hệ mới, kết hợp kỹ thuật truyền thống với thiết kế hiện đại.",
    },
    {
      src: "img/lop.jpg",
      title: "Lớp Học Nghề",
      desc: "Các nghệ nhân cao tuổi đang tận tình truyền dạy bí quyết dệt lụa cho thế hệ trẻ, đảm bảo dòng tơ không bao giờ đứt đoạn.",
    },
  ],
};

let currentGalleryList = []; // Danh sách ảnh đang xem
let currentGalleryIndex = 0; // Vị trí ảnh hiện tại

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const slideCounter = document.getElementById("slideCounter");

function openGallery(category, index) {
  if (galleries[category]) {
    currentGalleryList = galleries[category];
    currentGalleryIndex = index;
    updateModalContent();

    modal.classList.remove("closed");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (lenis) lenis.stop();
  } else {
    console.error("Danh mục không tồn tại: " + category);
  }
}

function changeSlide(direction) {
  if (currentGalleryList.length === 0) return;

  currentGalleryIndex += direction;

  if (currentGalleryIndex >= currentGalleryList.length) currentGalleryIndex = 0;
  if (currentGalleryIndex < 0)
    currentGalleryIndex = currentGalleryList.length - 1;

  modalImg.style.opacity = 0;
  modalTitle.style.opacity = 0;
  modalDesc.style.opacity = 0;

  setTimeout(() => {
    updateModalContent();
    modalImg.style.opacity = 1;
    modalTitle.style.opacity = 1;
    modalDesc.style.opacity = 1;
  }, 300);
}

function updateModalContent() {
  const slide = currentGalleryList[currentGalleryIndex];
  if (slide) {
    modalImg.src = slide.src;
    modalTitle.innerText = slide.title;
    modalDesc.innerText = slide.desc;
    slideCounter.innerText = `${currentGalleryIndex + 1} / ${
      currentGalleryList.length
    }`;
  }
}

function closeModal() {
  modal.classList.remove("open");
  modal.classList.add("closed");
  document.body.style.overflow = "";
  if (lenis) lenis.start();
}

modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", function (e) {
  if (!modal.classList.contains("open")) return;
  if (e.key === "ArrowLeft") changeSlide(-1);
  if (e.key === "ArrowRight") changeSlide(1);
  if (e.key === "Escape") closeModal();
});
