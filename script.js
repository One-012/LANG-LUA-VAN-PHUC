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
      playMusicOnLoad();
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

// --- XỬ LÝ NHẠC NỀN ---
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const iconSoundOn = document.getElementById("iconSoundOn");
const iconSoundOff = document.getElementById("iconSoundOff");
const musicBadge = document.getElementById("musicBadge");

let isMusicPlaying = false;

// 1. Toggle Nhạc Nền Chung
function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    iconSoundOn.classList.add("hidden");
    iconSoundOff.classList.remove("hidden");
    musicBadge.classList.add("hidden");
  } else {
    bgMusic.play();
    iconSoundOn.classList.remove("hidden");
    iconSoundOff.classList.add("hidden");
    musicBadge.classList.remove("hidden");
  }
  isMusicPlaying = !isMusicPlaying;
}
musicToggle.addEventListener("click", toggleMusic);

// 2. Tự động phát nhạc nền (nếu được)
function playMusicOnLoad() {
  bgMusic.volume = 0.4;
  bgMusic
    .play()
    .then(() => {
      isMusicPlaying = true;
    })
    .catch((error) => {
      isMusicPlaying = false;
      iconSoundOn.classList.add("hidden");
      iconSoundOff.classList.remove("hidden");

      document.addEventListener(
        "click",
        function enableAudio() {
          if (!isMusicPlaying) {
            bgMusic.play();
            isMusicPlaying = true;
            iconSoundOn.classList.remove("hidden");
            iconSoundOff.classList.add("hidden");
          }
          document.removeEventListener("click", enableAudio);
        },
        { once: true }
      );
    });
}

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
  const particleCount = 40;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("golden-particle");
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

// --- 3. THÊM HIỆU ỨNG VISUAL STORYTELLING ---

// 1. DI SẢN: Dải lụa bay
gsap.to(".silk-ribbon", {
  xPercent: 80,
  ease: "none",
  scrollTrigger: {
    trigger: "#intro",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.2,
  },
});

// 2. LỊCH SỬ: Các năm tháng trôi
gsap.utils.toArray(".floating-year").forEach((year, i) => {
  const speed = year.getAttribute("data-speed");
  gsap.to(year, {
    y: -200 * speed,
    opacity: 1,
    scrollTrigger: {
      trigger: "#history",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
});
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

// 3. KỸ THUẬT: Con thoi dệt
const shuttleTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#technique",
    start: "top 70%",
    toggleActions: "restart none none reverse",
  },
});

shuttleTl
  .to(".shuttle-container", {
    left: "150%",
    duration: 1.5,
    ease: "power4.inOut",
  })
  .to(
    ".shuttle-thread",
    {
      scaleX: 1,
      duration: 1.5,
      ease: "power4.inOut",
      opacity: 0,
    },
    "<0.1"
  );

// 4. DANH HIỆU: Mưa sao bùng nổ
const starContainer = document.getElementById("star-container");
for (let i = 0; i < 25; i++) {
  const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  star.setAttribute("viewBox", "0 0 24 24");
  star.setAttribute("fill", "currentColor");
  star.classList.add("falling-star");
  const size = Math.random() * 30 + 15;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * -200 + "px";
  star.innerHTML =
    '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>';
  starContainer.appendChild(star);
}

gsap.utils.toArray(".falling-star").forEach((star, i) => {
  gsap.to(star, {
    y: window.innerHeight + 200,
    rotation: Math.random() * 720,
    ease: "none",
    scrollTrigger: {
      trigger: "#awards",
      start: "top bottom",
      end: "bottom top",
      scrub: Math.random() * 1.5 + 0.5,
    },
  });
});

// 5. BẢO TỒN: Kén tằm tỏa sáng
gsap.to(".cocoon-floating", {
  y: -40,
  rotation: 15,
  scale: 1.1,
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

// --- YOUTUBE API, SCROLL PLAY & LOGIC ---
// 1. Tải Youtube Iframe API
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. Tạo player
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtube-player", {
    height: "100%",
    width: "100%",
    videoId: "EsKRFrninyU", // ID video
    playerVars: {
      autoplay: 1, // Tự động chạy (thường cần mute mới chạy được)
      controls: 0, // Ẩn control mặc định
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      playlist: "EsKRFrninyU",
      mute: 1, // Mặc định tắt tiếng để autoplay hoạt động
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

// Hàm hỗ trợ: Tắt nhạc nền web
function pauseWebBackgroundMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    isMusicPlaying = false;
    // Cập nhật giao diện nút nhạc nền
    iconSoundOn.classList.add("hidden");
    iconSoundOff.classList.remove("hidden");
    musicBadge.classList.add("hidden");
  }
}

// 3. Xử lý khi player sẵn sàng
function onPlayerReady(event) {
  // --- A. LOGIC SCROLL (Lướt tới thì chạy, lướt qua thì dừng) ---
  const videoSection = document.getElementById("video-showcase");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Nếu video đang trong vùng nhìn thấy
        if (entry.isIntersecting) {
          // Chỉ auto-play nếu người dùng chưa bấm nút Pause thủ công (có thể thêm biến check nếu muốn chặt chẽ hơn)
          // Ở đây để đơn giản: cứ lướt tới là chạy
          player.playVideo();
          updatePlayBtnIcon(true);
        } else {
          // Lướt qua thì dừng
          player.pauseVideo();
          updatePlayBtnIcon(false);
        }
      });
    },
    { threshold: 0.5 }
  ); // Ít nhất 50% video hiện ra thì mới tính

  observer.observe(videoSection);

  // --- B. LOGIC NÚT PLAY/PAUSE VIDEO ---
  const playBtn = document.getElementById("videoPlayBtn");
  const iconPlay = document.getElementById("iconVideoPlay");
  const iconPause = document.getElementById("iconVideoPause");
  let isVideoPlaying = true; // Mặc định đang autoplay

  function updatePlayBtnIcon(playing) {
    if (playing) {
      iconPlay.classList.add("hidden");
      iconPause.classList.remove("hidden");
      isVideoPlaying = true;
    } else {
      iconPlay.classList.remove("hidden");
      iconPause.classList.add("hidden");
      isVideoPlaying = false;
    }
  }

  playBtn.addEventListener("click", function () {
    if (isVideoPlaying) {
      player.pauseVideo();
      updatePlayBtnIcon(false);
    } else {
      player.playVideo();
      updatePlayBtnIcon(true);
      // Khi người dùng chủ động bấm Play -> Tắt nhạc nền web
      pauseWebBackgroundMusic();
    }
  });

  // Sự kiện khi video thay đổi trạng thái (ví dụ video tự dừng do bufffering hoặc hết bài)
  // Có thể dùng để đồng bộ nút Play/Pause chính xác hơn nếu cần.

  // --- C. LOGIC NÚT MUTE/UNMUTE VIDEO ---
  const muteBtn = document.getElementById("videoMuteBtn");
  const iconMute = document.getElementById("iconVideoMute");
  const iconUnmute = document.getElementById("iconVideoUnmute");
  let isVideoMuted = true; // Mặc định playerVars mute=1

  muteBtn.addEventListener("click", function () {
    if (isVideoMuted) {
      player.unMute();
      isVideoMuted = false;
      iconMute.classList.add("hidden");
      iconUnmute.classList.remove("hidden");

      // Khi người dùng bật tiếng video -> Chắc chắn muốn nghe -> Tắt nhạc nền web
      pauseWebBackgroundMusic();
    } else {
      player.mute();
      isVideoMuted = true;
      iconMute.classList.remove("hidden");
      iconUnmute.classList.add("hidden");
    }
  });
}

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
      src: "img/111.jpg",
      title: "Nghệ Nhân Dệt Lụa",
      desc: "Hình ảnh người nghệ nhân bên khung cửi truyền thống. Đôi bàn tay khéo léo điều khiển từng sợi tơ mảnh mai để tạo nên những tấm lụa bền đẹp.",
    },
    {
      src: "img/112.jpg",
      title: "Ký Ức Thời Gian",
      desc: "Những khung cửi cổ xưa vẫn được lưu giữ và hoạt động, là minh chứng sống động cho lịch sử phát triển lâu đời của làng nghề.",
    },
    {
      src: "img/113.jpg",
      title: "Sức Sống Đương Đại",
      desc: "Trải qua bao thăng trầm lịch sử, Vạn Phúc ngày nay không chỉ giữ được nghề cổ mà còn khoác lên mình diện mạo mới rực rỡ. Những gian hàng tấp nập là minh chứng cho sự thích ứng và sức sống bền bỉ của làng nghề trong đời sống hiện đại.",
    },
    {
      src: "img/nghe-nhan-den-trang.png",
      title: "Nghệ Nhân May Đo",
      desc: "Hình ảnh người thợ may cần mẫn bên chiếc máy khâu, góp phần tạo nên những bộ trang phục lụa tinh tế từ những tấm vải dệt thủ công.",
    },
  ],
  // 3. QUY MÔ (MỚI)
  scale: [
    {
      src: "img/quy-mo.jpg",
      title: "Quy Mô Làng Nghề",
      desc: "Toàn cảnh sự phát triển mạnh mẽ của làng nghề với hàng trăm hộ kinh doanh và sản xuất, tạo nên một trung tâm lụa sầm uất bậc nhất Hà thành.",
    },
    {
      src: "img/tay1.jpg", // Giả định ảnh khách tham quan
      title: "Điểm Đến Quốc Tế",
      desc: "Vạn Phúc không chỉ thu hút khách trong nước mà còn là điểm đến yêu thích của du khách quốc tế muốn tìm hiểu văn hóa Việt Nam.",
    },
  ],
  // 4. KỸ THUẬT (CẬP NHẬT: Giữ Lụa Vân & Phơi, Thêm 8 ảnh mới)
  technique: [
    {
      src: "img/ẢNH LỤA.png",
      title: "Tinh Hoa Lụa Vân",
      desc: "Cận cảnh bề mặt tấm lụa Vân - đặc sản trứ danh. Các hoa văn chìm nổi tinh tế được tạo ra ngay trong quá trình dệt nhờ kỹ thuật điều khiển sợi tơ điêu luyện.",
    },
    {
      src: "img/mem-mai.jpg",
      title: "Phơi Tơ Ánh Nắng", // Giữ lại ảnh này (Lụa Phơi/Mềm mại)
      desc: "Những dải lụa mềm mại được phơi dưới ánh nắng tự nhiên, một hình ảnh đặc trưng làm nên vẻ đẹp thơ mộng của làng nghề.",
    },
    // Thêm mới từ 11-18
    {
      src: "img/11.jpg", // 11
      title: "Kéo Kén Ươm Tơ",
      desc: "Công đoạn kéo kén sau khi tằm nhả tơ, đóng kén. Đây là bước khởi đầu quan trọng để thu được những sợi tơ thô chất lượng.",
    },
    {
      src: "img/12.jpg", // 12
      title: "Xử Lý Sợi Tơ",
      desc: "Công đoạn xử lý sợi tơ trong kỹ thuật dệt lụa Vạn Phúc để tránh rối tơ khi dệt, đảm bảo độ bóng mượt cho sản phẩm cuối cùng.",
    },
    {
      src: "img/13.png", // 13
      title: "Kéo Sợi Vào Guồng",
      desc: "Đầu sợi tơ được kéo ra các lõi sau khi cho vào guồng, chuẩn bị cho các công đoạn tiếp theo.",
    },
    {
      src: "img/14.jpg", // 14
      title: "Công Đoạn Mắc Cửi",
      desc: "Sợi tơ được bố trí xen kẽ và đều tập trung trong công đoạn mắc cửi, đòi hỏi sự sắp xếp tỉ mỉ và chính xác.",
    },
    {
      src: "img/15.jpg", // 15
      title: "Nối Cửi Thủ Công",
      desc: "Công đoạn nối cửi đòi hỏi người nối phải có kinh nghiệm, khéo léo, tỉ mỉ. Chỉ cần sai sót nhỏ thì khi dệt sẽ bị lỗi ngay lập tức.",
    },
    {
      src: "img/16.jpg", // 16
      title: "Khung Dệt Truyền Thống",
      desc: "Sợi tơ được đưa vào khung dệt truyền thống. Tiếng thoi đưa lách cách là âm thanh quen thuộc bao đời nay của làng Vạn Phúc.",
    },
    {
      src: "img/17.jpg", // 17
      title: "Nhuộm Lụa Thủ Công",
      desc: "Nhuộm lụa thủ công. Để có màu tấm lụa đẹp, công đoạn nhuộm và pha chế màu đòi hỏi bí quyết riêng của từng nghệ nhân.",
    },
    {
      src: "img/18.jpg", // 18
      title: "Phơi Tơ Sau Nhuộm",
      desc: "Phơi tơ sau khi nhuộm màu. Ngày nay dù có công nghệ hỗ trợ thì việc phơi dưới nắng tự nhiên vẫn giúp lụa bền màu và đẹp nhất.",
    },
  ],
  // 5. DANH HIỆU (Đã xóa 1 ảnh kỷ lục thừa)
  awards: [
    {
      src: "img/don-nhan-bang-di-san.png",
      title: "Đón Nhận Bằng Di Sản",
      desc: "Lãnh đạo phường Vạn Phúc vinh dự đón nhận Bằng chứng nhận nghề dệt lụa Vạn Phúc là Di sản văn hóa phi vật thể Quốc gia.",
    },
    {
      src: "img/mang-luoi-thu-cong.png",
      title: "Mạng Lưới Sáng Tạo Toàn Cầu",
      desc: "Chứng nhận làng nghề dệt Vạn Phúc chính thức trở thành thành viên của Mạng lưới các thành phố Thủ công sáng tạo thế giới.",
    },
    {
      src: "img/le-cong-nhan-mang-luoi.jpg",
      title: "Lễ Công Nhận Quốc Tế",
      desc: "Quang cảnh buổi lễ trang trọng công nhận làng lụa Vạn Phúc trở thành thành viên mạng lưới các thành phố thủ công sáng tạo trên thế giới.",
    },
    {
      src: "img/bang-ki-luc.png",
      title: "Chứng Nhận Di Sản",
      desc: "Bằng kỉ lục “Làng nghề dệt lụa tơ tằm lâu đời nhất Việt Nam” Vạn Phúc.",
    },
    {
      src: "img/cu gia.png",
      title: "Tôn Vinh Nghệ Nhân",
      desc: "Sự ghi nhận xứng đáng dành cho những đôi bàn tay vàng, những người nghệ nhân đã dành cả cuộc đời để giữ lửa nghề.",
    },
  ],
  // 6. BẢO TỒN
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

let currentGalleryList = [];
let currentGalleryIndex = 0;

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
