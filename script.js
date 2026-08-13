document.addEventListener("DOMContentLoaded", () => {
  // Back to top button functionality
  const backToTopButton = document.getElementById("back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate stats on page load
  const statValues = document.querySelectorAll(".stat-value")

  statValues.forEach((statValue) => {
    const finalValue = statValue.textContent
    statValue.textContent = "0"

    // Simple animation for numbers
    const startValue = 0
    const endValue = Number.parseInt(finalValue.replace(/[^\d]/g, ""))
    const duration = 1500
    const startTime = performance.now()

    function updateNumber(currentTime) {
      const elapsedTime = currentTime - startTime
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration
        const currentValue = Math.floor(progress * endValue)

        // Add back any non-numeric characters
        statValue.textContent = finalValue.replace(/\d+/, currentValue)

        requestAnimationFrame(updateNumber)
      } else {
        statValue.textContent = finalValue
      }
    }

    requestAnimationFrame(updateNumber)
  })

  // Make sure newly added stats are also animated
  document.querySelectorAll(".stat-value").forEach((statValue) => {
    if (statValue.textContent !== "0") {
      const finalValue = statValue.textContent

      // Check if this stat has already been animated
      if (!statValue.hasAttribute("data-animated")) {
        statValue.setAttribute("data-animated", "true")
        statValue.textContent = "0"

        // Simple animation for numbers
        const endValue = Number.parseInt(finalValue.replace(/[^\d]/g, ""))
        const duration = 1500
        const startTime = performance.now()

        function updateNumber(currentTime) {
          const elapsedTime = currentTime - startTime
          if (elapsedTime < duration) {
            const progress = elapsedTime / duration
            const currentValue = Math.floor(progress * endValue)

            // Add back any non-numeric characters
            statValue.textContent = finalValue.replace(/\d+/, currentValue)

            requestAnimationFrame(updateNumber)
          } else {
            statValue.textContent = finalValue
          }
        }

        requestAnimationFrame(updateNumber)
      }
    }
  })

  // Add subtle hover effect to all project cards
  const projectCards = document.querySelectorAll(".project-card:not(.enhanced-card)")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)"
      card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      card.style.boxShadow = "none"
    })
  })

  // Check main/backup links for projects that provide data-main/data-backup
  function checkLinkAvailability(anchor, mainUrl, backupUrl, timeout = 4000) {
    return new Promise((resolve) => {
      let resolved = false
      const img = new Image()

      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true
          resolve(false)
        }
      }, timeout)

      img.onload = () => {
        if (!resolved) {
          resolved = true
          clearTimeout(timer)
          resolve(true)
        }
      }

      img.onerror = () => {
        if (!resolved) {
          resolved = true
          clearTimeout(timer)
          resolve(false)
        }
      }

      // Try to load a likely small resource from the main site
      try {
        const url = new URL(mainUrl)
        img.src = url.origin + "/favicon.ico"
      } catch (e) {
        img.src = mainUrl
      }
    })
  }

  // Find all anchors with data-main and data-backup and update href accordingly
  document.querySelectorAll('a[data-main][data-backup]').forEach(async (a) => {
    const main = a.getAttribute('data-main')
    const backup = a.getAttribute('data-backup')
    const ok = await checkLinkAvailability(a, main, backup)
    a.href = ok ? main : backup
  })
})
