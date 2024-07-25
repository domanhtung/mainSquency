gsap.registerPlugin(ScrollTrigger);

const horizontalSections = gsap.utils.toArray("section.horizontal");

const ecosystemTab = document?.getElementsByClassName("ecosystem-tab");

const handleClick = (index) => {
  if (
    ecosystemTab[index]?.attributes?.getNamedItem("aria-selected").value ===
    "true"
  )
    return;
  Array.prototype.forEach.call(ecosystemTab, function (value) {
    if (index === value?.attributes?.getNamedItem("aria-index").value) {
      value.setAttribute("aria-selected", "true");
      const headingId = "ecosystem-" + (+index + 1);
      const currentEco = document.getElementById(headingId);
      const horizontal = document.getElementById("horizontal");
      window.scrollTo({
        top:
          horizontal?.offsetTop +
          ((currentEco?.clientWidth || 0) - 50) *
            value?.attributes?.getNamedItem("aria-index").value -
          0,
        behavior: "smooth",
      });
    } else {
      value.setAttribute("aria-selected", "false");
    }
  });
};

Array.prototype.forEach.call(ecosystemTab, function (value) {
  value?.addEventListener("click", () =>
    handleClick(value?.attributes?.getNamedItem("aria-index").value)
  );
});

window.onunload = function () {
  Array.prototype.forEach.call(ecosystemTab, function (value) {
    value?.removeEventListener("click", () => console.log("leaving page"));
  });
  return;
};

horizontalSections.forEach(function (sec, i) {
  const thisPinWrap = sec.querySelector(".pin-wrap");
  const thisAnimWrap = thisPinWrap.querySelector(".animation-wrap");

  const getToValue = () =>
    -(thisAnimWrap.scrollWidth - thisPinWrap.clientWidth);

  const handleToggle = (self) => {
    const ecosystem = document.getElementById("ecosystem");
    const section5 = document.getElementById("section-5");
    const currentEco = document.getElementById("ecosystem-1");
    if (self?.isActive) {
      ecosystem.style.position = "fixed";
      ecosystem.style.width = "100%";
      ecosystem.style.top = 0;
      ecosystem.style.left = 0;
      ecosystem.style.padding = "100px 0 20px 0";
      ecosystem.style.zIndex = 10;
      section5.style.position = "fixed";
      section5.style.width = "100%";
      section5.style.top = `${currentEco?.clientHeight + 200}px`;
      section5.style.left = 0;
      section5.style.zIndex = 10;
    } else {
      if (self?.direction === -1) {
        section5.style = null;
        section5.style.position = "absolute";
        section5.style.top = `${currentEco?.clientHeight}px`;
      } else {
        section5.style = null;
        section5.style.position = "relative";
        section5.style.top = "0";
      }
      ecosystem.style = null;
    }
  };

  const handleUpdate = (self) => {
    const horizontal = document.getElementById("horizontal");
    const currentEco = document.getElementById("ecosystem-1");
    if (!currentEco?.clientWidth) return;
    const index = Math.floor(
      (self?.scroller?.pageYOffset -
        horizontal?.offsetTop -
        (currentEco?.clientWidth || 0) * 0.5) /
        ((currentEco?.clientWidth || 0) + 20)
    );
    if (
      ecosystemTab[index + 1]?.attributes?.getNamedItem("aria-selected")
        .value === "true"
    )
      return;
    Array.prototype.forEach.call(ecosystemTab, function (value) {
      if (index + 1 === +value?.attributes?.getNamedItem("aria-index").value) {
        value.setAttribute("aria-selected", "true");
      } else {
        value.setAttribute("aria-selected", "false");
      }
    });
  };

  gsap.fromTo(
    thisAnimWrap,
    {
      x: () => 0,
    },
    {
      x: () => getToValue(),
      ease: "none",
      scrollTrigger: {
        trigger: sec,
        start: "top 200px",
        end: thisAnimWrap.scrollWidth,
        onToggle: (self) => handleToggle(self),
        onUpdate: (self) => handleUpdate(self),
        pin: thisPinWrap,
        invalidateOnRefresh: true,
        scrub: true,
        // markers: true,
      },
    }
  );
});
