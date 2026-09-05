'use client'

import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const academyImage =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c05cb8b9-b3fb-4f7a-9dea-d2cfb6ac0dbe-27adhLGGpMxHiABqCA2FAylqIXSNQU.jpeg'

const winnerLogo =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abad9ee9-2e7f-41d6-8b9e-202a92728866-Jhi2RjdIfdvez3LCpVL2ECKTP3ak1Q.jpeg'

const racketCutout = '/winner-racket-isolated.png'
const racketFallback = racketCutout

const products = [
  {
    id: 1,
    brand: 'Yonex',
    name: 'EZONE 98 TOUR',
    category: 'Raquetes',
    price: 'R$ 1.899,00',
    installment: '10x de R$ 189,90',
    tag: 'Mais vendido',
    image: racketCutout,
    alt: 'Raquete Yonex Ezone 98 Tour',
  },
  {
    id: 2,
    brand: 'Babolat',
    name: 'PURE AERO 98',
    category: 'Raquetes',
    price: 'R$ 1.749,00',
    installment: '10x de R$ 174,90',
    tag: 'Exclusivo',
    image: racketCutout,
    alt: 'Raquete de tênis Babolat',
  },
  {
    id: 3,
    brand: 'Wilson',
    name: 'BLADE 98 V9',
    category: 'Raquetes',
    price: 'R$ 1.699,00',
    installment: '10x de R$ 169,90',
    tag: 'Novo',
    image:
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=900&q=85',
    alt: 'Raquete Wilson Blade',
  },
  {
    id: 4,
    brand: 'Asics',
    name: 'GEL RESOLUTION 9',
    category: 'Calçados',
    price: 'R$ 899,00',
    installment: '10x de R$ 89,90',
    tag: 'Novo',
    image:
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=85',
    alt: 'Tênis esportivo Asics',
  },
  {
    id: 5,
    brand: 'Nike',
    name: 'COURT ADVANTAGE',
    category: 'Calçados',
    price: 'R$ 749,00',
    installment: '10x de R$ 74,90',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
    alt: 'Tênis esportivo Nike',
  },
  {
    id: 6,
    brand: 'Wilson',
    name: 'PRO OVERGRIP',
    category: 'Acessórios',
    price: 'R$ 69,90',
    installment: '3x de R$ 23,30',
    image:
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=900&q=85',
    alt: 'Acessório esportivo Wilson',
  },
]

function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete })

      gsap.set('.loader-logo', {
        opacity: 0,
        scale: 0.86,
        filter: 'blur(8px) brightness(.9)',
      })

      gsap.set('.loader-glow', {
        opacity: 0,
        scale: 0.75,
      })

      tl.to('.loader-logo', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px) brightness(1.08)',
        duration: 0.72,
        ease: 'power3.out',
      })
        .to(
          '.loader-glow',
          {
            opacity: 0.34,
            scale: 1,
            duration: 0.72,
            ease: 'power2.out',
          },
          '<',
        )
        .to('.loader-logo', {
          scale: 1.045,
          duration: 0.38,
          ease: 'sine.inOut',
        })
        .to('.loader-logo', {
          scale: 1,
          duration: 0.34,
          ease: 'sine.inOut',
        })
        .to(
          '.loader-glow',
          {
            opacity: 0.16,
            scale: 1.08,
            duration: 0.32,
            ease: 'sine.out',
          },
          '<',
        )
        .to('.loader-brand', {
          opacity: 0,
          scale: 0.97,
          y: -10,
          duration: 0.42,
          ease: 'power2.in',
        })
        .to(
          root.current,
          {
            opacity: 0,
            duration: 0.38,
            ease: 'power2.out',
          },
          '-=.22',
        )
    }, root)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={root}
      className="preloader"
      aria-label="Carregando Winner"
    >
      <div className="loader-brand">
        <span className="loader-glow" aria-hidden="true" />
        <img
          className="loader-logo"
          src={winnerLogo}
          alt="Winner"
        />
      </div>
    </div>
  )
}

function ProductCard({
  product,
  liked,
  onLike,
  onAdd,
}: {
  product: (typeof products)[number]
  liked: boolean
  onLike: () => void
  onAdd: () => void
}) {
  const [imageSrc, setImageSrc] = useState(product.image)

  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={imageSrc}
          alt={product.alt}
          className={`product-photo ${product.id === 1 || product.id === 2 ? 'product-photo-racket' : ''}`}
          onError={() => setImageSrc(racketFallback)}
        />

        <button
          className={`heart ${liked ? 'liked' : ''}`}
          onClick={onLike}
          aria-label={`${liked ? 'Remover' : 'Adicionar'} ${product.name} dos favoritos`}
        >
          <Heart
            size={18}
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>

        {product.tag && (
          <span className="product-tag">{product.tag}</span>
        )}

        <button
          className="quick-add quick-add-overlay"
          onClick={onAdd}
        >
          Adicionar à sacola
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="product-info">
        <div>
          <small>{product.brand}</small>
          <h3>{product.name}</h3>
          <p>{product.installment}</p>
        </div>

        <strong>{product.price}</strong>
      </div>

      <button
        className="quick-add"
        onClick={onAdd}
      >
        Adicionar à sacola
        <ArrowRight size={15} />
      </button>
    </article>
  )
}

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cart, setCart] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [liked, setLiked] = useState<number[]>([])
  const [filter, setFilter] = useState('Todos')

  const motionRoot = useRef<HTMLElement>(null)

  const filtered = useMemo(
    () =>
      filter === 'Todos'
        ? products
        : filter === 'Favoritos'
          ? products.filter((product) =>
              liked.includes(product.id),
            )
          : products.filter(
              (product) => product.category === filter,
            ),
    [filter, liked],
  )

  const handleLoaderComplete = useCallback(
    () => setLoading(false),
    [],
  )

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.25,
        ease: 'power3.out',
      })

      /*
       * RAQUETE GLOBAL — DESKTOP
       * Uma única timeline, com movimento orgânico e contínuo.
       */
      mm.add('(min-width: 801px)', () => {
        const racket = motionRoot.current?.querySelector('.hero-racket') as HTMLElement | null
        const stage = motionRoot.current?.querySelector('.racket-stage') as HTMLElement | null

        if (!racket || !stage) return

        gsap.set(racket, {
          position: 'fixed',
          left: '50%',
          top: '50%',
          right: 'auto',
          opacity: 1,
          x: () => Math.min(window.innerWidth * 0.30, 520),
          y: () => -window.innerHeight * 0.025,
          xPercent: -50,
          yPercent: -50,
          scale: 0.80,
          rotate: -7,
          rotationY: -7,
          skewX: 0,
        })

        gsap.set('.racket-ball', {
          opacity: 0,
          scale: 0.7,
          x: 0,
          y: 0,
        })

        gsap.set('.racket-impact', {
          opacity: 0,
          scale: 0.4,
        })

        const racketTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero',
            endTrigger: '.racket-stage',
            start: 'top top',
            end: 'center center',
            scrub: 1.6,
            invalidateOnRefresh: true,
          },
        })

        racketTl
          // HERO — aproximação suave
          .to(racket, {
            x: () => Math.min(window.innerWidth * 0.265, 470),
            y: () => -window.innerHeight * 0.012,
            scale: 0.94,
            rotate: -3,
            rotationY: -3,
            duration: 0.18,
            ease: 'sine.inOut',
          })

          // pequena preparação
          .to(racket, {
            x: () => Math.min(window.innerWidth * 0.235, 425),
            y: () => window.innerHeight * 0.004,
            scale: 1.02,
            rotate: -14,
            rotationY: 2,
            skewX: 1.5,
            duration: 0.10,
            ease: 'power2.inOut',
          })

          // bola entra na cena
          .to(
            '.racket-ball',
            {
              opacity: 1,
              scale: 1,
              duration: 0.03,
              ease: 'sine.out',
            },
            '<65%',
          )

          // TACADA — rápida, mas sem tranco
          .to(racket, {
            x: () => Math.min(window.innerWidth * 0.185, 350),
            y: () => window.innerHeight * 0.018,
            scale: 1.12,
            rotate: 24,
            rotationY: 7,
            skewX: -2.5,
            duration: 0.075,
            ease: 'power3.inOut',
          })
          .to(
            '.racket-impact',
            {
              opacity: 0.72,
              scale: 1,
              duration: 0.018,
              ease: 'none',
            },
            '<52%',
          )
          .to('.racket-impact', {
            opacity: 0,
            scale: 4.2,
            duration: 0.045,
            ease: 'power2.out',
          })
          .to(
            '.racket-ball',
            {
              x: () => -window.innerWidth * 0.47,
              y: () => -window.innerHeight * 0.15,
              scale: 0.52,
              opacity: 0,
              duration: 0.11,
              ease: 'power3.out',
            },
            '<',
          )

          // recuperação com leve overshoot
          .to(racket, {
            x: () => Math.min(window.innerWidth * 0.165, 315),
            y: () => window.innerHeight * 0.035,
            scale: 1.04,
            rotate: 7,
            rotationY: 2,
            skewX: 0,
            duration: 0.095,
            ease: 'back.out(1.15)',
          })

          // STATEMENT — caminho em curva suave até o centro
          .to(racket, {
            x: () => Math.min(window.innerWidth * 0.135, 255),
            y: () => window.innerHeight * 0.050,
            scale: 1.01,
            rotate: -5,
            rotationY: -3,
            duration: 0.105,
            ease: 'sine.inOut',
          })
          .to(racket, {
            x: () => Math.min(window.innerWidth * 0.095, 185),
            y: () => window.innerHeight * 0.042,
            scale: 0.995,
            rotate: 4,
            rotationY: 2,
            duration: 0.105,
            ease: 'sine.inOut',
          })
          .to(racket, {
            x: () => Math.min(window.innerWidth * 0.055, 105),
            y: () => window.innerHeight * 0.028,
            scale: 0.99,
            rotate: -2,
            rotationY: -1,
            duration: 0.09,
            ease: 'sine.inOut',
          })

          // ENGENHARIA — encaixe elegante no centro
          .to(racket, {
            x: 0,
            y: 0,
            scale: 1.03,
            rotate: 0,
            rotationY: 0,
            duration: 0.10,
            ease: 'power2.out',
          })
          .to(racket, {
            scale: 1,
            duration: 0.05,
            ease: 'sine.out',
          })

        const dockRacket = () => {
          const app = motionRoot.current
          if (!app) return

          const appRect = app.getBoundingClientRect()
          const stageRect = stage.getBoundingClientRect()

          const dockLeft = stageRect.left - appRect.left + stageRect.width / 2
          const dockTop = stageRect.top - appRect.top + stageRect.height / 2

          gsap.set(racket, {
            position: 'absolute',
            left: dockLeft,
            top: dockTop,
            right: 'auto',
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            rotate: 0,
            rotationY: 0,
            skewX: 0,
            opacity: 1,
          })
        }

        const undockRacket = () => {
          gsap.set(racket, {
            position: 'fixed',
            left: '50%',
            top: '50%',
            right: 'auto',
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            rotate: 0,
            rotationY: 0,
            skewX: 0,
            opacity: 1,
          })
        }

        ScrollTrigger.create({
          trigger: '.racket-stage',
          start: 'center center',
          onEnter: dockRacket,
          onLeaveBack: undockRacket,
          invalidateOnRefresh: true,
        })
      })

      /*
       * RAQUETE GLOBAL — MOBILE / TABLET
       * Mesma linguagem do desktop, com amplitude menor.
       */
      mm.add('(max-width: 800px)', () => {
        const racket = motionRoot.current?.querySelector('.hero-racket') as HTMLElement | null
        const stage = motionRoot.current?.querySelector('.racket-stage') as HTMLElement | null

        if (!racket || !stage) return

        gsap.set(racket, {
          position: 'fixed',
          left: '50%',
          top: '50%',
          right: 'auto',
          opacity: 0.94,
          x: () => window.innerWidth * 0.18,
          y: () => window.innerHeight * 0.065,
          xPercent: -50,
          yPercent: -50,
          scale: 0.72,
          rotate: -6,
          rotationY: -5,
          skewX: 0,
        })

        gsap.set('.racket-ball', {
          opacity: 0,
          scale: 0.65,
          x: 0,
          y: 0,
        })

        gsap.set('.racket-impact', {
          opacity: 0,
          scale: 0.4,
        })

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero',
            endTrigger: '.racket-stage',
            start: 'top top',
            end: 'center center',
            scrub: 1.45,
            invalidateOnRefresh: true,
          },
        })

        mobileTl
          .to(racket, {
            x: () => window.innerWidth * 0.155,
            y: () => window.innerHeight * 0.052,
            scale: 0.82,
            rotate: -2,
            rotationY: -2,
            duration: 0.18,
            ease: 'sine.inOut',
          })
          .to(racket, {
            x: () => window.innerWidth * 0.13,
            y: () => window.innerHeight * 0.058,
            scale: 0.88,
            rotate: -12,
            rotationY: 2,
            skewX: 1,
            duration: 0.10,
            ease: 'power2.inOut',
          })
          .to(
            '.racket-ball',
            {
              opacity: 0.9,
              scale: 0.78,
              duration: 0.03,
              ease: 'sine.out',
            },
            '<65%',
          )
          .to(racket, {
            x: () => window.innerWidth * 0.085,
            y: () => window.innerHeight * 0.070,
            scale: 0.94,
            rotate: 15,
            rotationY: 5,
            skewX: -1.5,
            duration: 0.075,
            ease: 'power3.inOut',
          })
          .to(
            '.racket-impact',
            {
              opacity: 0.55,
              scale: 0.75,
              duration: 0.018,
              ease: 'none',
            },
            '<52%',
          )
          .to('.racket-impact', {
            opacity: 0,
            scale: 3.2,
            duration: 0.04,
            ease: 'power2.out',
          })
          .to(
            '.racket-ball',
            {
              x: () => -window.innerWidth * 0.42,
              y: () => -window.innerHeight * 0.11,
              scale: 0.42,
              opacity: 0,
              duration: 0.10,
              ease: 'power3.out',
            },
            '<',
          )
          .to(racket, {
            x: () => window.innerWidth * 0.075,
            y: () => window.innerHeight * 0.056,
            scale: 0.86,
            rotate: 5,
            rotationY: 1,
            skewX: 0,
            duration: 0.095,
            ease: 'back.out(1.12)',
          })
          .to(racket, {
            x: () => window.innerWidth * 0.055,
            y: () => window.innerHeight * 0.046,
            scale: 0.84,
            rotate: -4,
            rotationY: -2,
            duration: 0.10,
            ease: 'sine.inOut',
          })
          .to(racket, {
            x: () => window.innerWidth * 0.03,
            y: () => window.innerHeight * 0.032,
            scale: 0.84,
            rotate: 3,
            rotationY: 1,
            duration: 0.10,
            ease: 'sine.inOut',
          })
          .to(racket, {
            x: 0,
            y: 0,
            scale: 0.90,
            rotate: 0,
            rotationY: 0,
            skewX: 0,
            duration: 0.12,
            ease: 'power2.out',
          })
          .to(racket, {
            scale: 0.88,
            duration: 0.05,
            ease: 'sine.out',
          })

        const dockRacketMobile = () => {
          const app = motionRoot.current
          if (!app) return

          const appRect = app.getBoundingClientRect()
          const stageRect = stage.getBoundingClientRect()

          const dockLeft = stageRect.left - appRect.left + stageRect.width / 2
          const dockTop = stageRect.top - appRect.top + stageRect.height / 2

          gsap.set(racket, {
            position: 'absolute',
            left: dockLeft,
            top: dockTop,
            right: 'auto',
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            scale: 0.88,
            rotate: 0,
            rotationY: 0,
            skewX: 0,
            opacity: 1,
          })
        }

        const undockRacketMobile = () => {
          gsap.set(racket, {
            position: 'fixed',
            left: '50%',
            top: '50%',
            right: 'auto',
            x: 0,
            y: 0,
            xPercent: -50,
            yPercent: -50,
            scale: 0.88,
            rotate: 0,
            rotationY: 0,
            skewX: 0,
            opacity: 1,
          })
        }

        ScrollTrigger.create({
          trigger: '.racket-stage',
          start: 'center center',
          onEnter: dockRacketMobile,
          onLeaveBack: undockRacketMobile,
          invalidateOnRefresh: true,
        })
      })

      gsap.to('.hero-image', {
        yPercent: 12,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.hero-commercial', {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: '.hero',
          start: '25% top',
          end: '75% top',
          scrub: true,
        },
      })

      gsap.from('.statement-line', {
        y: 65,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.statement',
          start: 'top 70%',
          end: 'top 35%',
          scrub: 1,
        },
      })

      gsap.to('.statement-final', {
        color: 'var(--green)',
        scrollTrigger: {
          trigger: '.statement',
          start: 'top 45%',
          end: 'bottom 60%',
          scrub: true,
        },
      })

      gsap.from('.academy-stat', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.academy',
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
      })
    }, motionRoot)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <>
      <Preloader onComplete={handleLoaderComplete} />

      <main
        ref={motionRoot}
        className={`winner-app ${loading ? 'is-loading' : ''}`}
      >
        {/* RAQUETE GLOBAL / FLUTUANTE */}
        <img
          src={racketCutout}
          alt="Raquete Winner em movimento"
          className="hero-racket"
        />

        <span className="racket-ball" aria-hidden="true" />
        <span className="racket-impact" aria-hidden="true" />

        <header className="site-header">
          <a
            href="#top"
            className="wordmark"
            aria-label="Winner Store"
          >
            <img
              className="official-logo"
              src={winnerLogo}
              alt="Winner"
            />
          </a>

          <nav
            className="desktop-nav"
            aria-label="Navegação principal"
          >
            <a href="#novidades">Novidades</a>
            <a href="#raquetes">Raquetes</a>
            <a href="#shop">Calçados</a>
            <a href="#acessorios">Acessórios</a>
            <a href="#universo">Universo Winner</a>
          </nav>

          <div className="header-tools">
            <button
              aria-label="Buscar"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </button>

            <button
              aria-label={`Favoritos, ${liked.length} itens`}
              onClick={() => {
                setFilter('Favoritos')
                document
                  .getElementById('shop')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Heart
                size={18}
                fill={liked.length ? 'currentColor' : 'none'}
              />
              <b>{liked.length}</b>
            </button>

            <button
              aria-label={`Sacola com ${cart} itens`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={18} />
              <b>{cart}</b>
            </button>

            <button
              className="menu-button"
              aria-label="Abrir menu"
              onClick={() => setMenu(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        {cartOpen && (
          <div
            className="cart-drawer"
            role="dialog"
            aria-label="Sua sacola"
          >
            <button
              className="close"
              onClick={() => setCartOpen(false)}
              aria-label="Fechar sacola"
            >
              <X />
            </button>

            <span className="eyebrow">Sua sacola</span>

            <h2>
              {cart
                ? `${cart} ${cart === 1 ? 'item' : 'itens'}`
                : 'Sua sacola está vazia'}
            </h2>

            {cart ? (
              <p>
                Produtos selecionados para o seu próximo ponto.
              </p>
            ) : (
              <a
                className="button button-green"
                href="#shop"
                onClick={() => setCartOpen(false)}
              >
                Explorar produtos
                <ArrowRight size={16} />
              </a>
            )}
          </div>
        )}

        {menu && (
          <div className="mobile-menu">
            <button
              className="close"
              onClick={() => setMenu(false)}
              aria-label="Fechar menu"
            >
              <X />
            </button>

            <span className="eyebrow">
              Navegue pela Winner
            </span>

            {[
              'Novidades',
              'Raquetes',
              'Calçados',
              'Acessórios',
              'Beach Tennis',
              'A Academia',
            ].map((item) => (
              <a
                key={item}
                href="#shop"
                onClick={() => setMenu(false)}
              >
                {item}
                <ArrowRight size={18} />
              </a>
            ))}
          </div>
        )}

        {searchOpen && (
          <div className="search-overlay">
            <button
              className="close"
              onClick={() => setSearchOpen(false)}
              aria-label="Fechar busca"
            >
              <X />
            </button>

            <span className="eyebrow">
              Buscar na Winner Store
            </span>

            <div className="search-field">
              <Search />
              <input
                autoFocus
                placeholder="Raquete, marca, tecnologia..."
              />
            </div>

            <p>Encontre seu próximo ponto.</p>
          </div>
        )}

        <section
          id="top"
          className="hero"
        >
          <img
            src={academyImage}
            alt="Quadra esportiva da Winner ao entardecer"
            className="hero-image"
          />

          <div className="hero-shade" />

          <div className="hero-copy hero-commercial">
            <span className="eyebrow">
              Winner Store / 2026
            </span>

            <h1>
              PRECISÃO
              <br />
              <em>EM CADA</em>
              <br />
              PONTO<span>.</span>
            </h1>

            <p>
              Equipamentos selecionados para quem leva
              performance a sério.
            </p>

            <div className="hero-actions">
              <a
                className="button button-green"
                href="#shop"
              >
                Explorar raquetes
                <ArrowRight size={16} />
              </a>

              <a
                className="text-link"
                href="#universo"
              >
                Ver novidades
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="hero-meta">
            <span>01 — 04</span>
            <span>São Paulo / Brasil</span>
            <span className="scroll-cue">
              Scroll para explorar ↓
            </span>
          </div>
        </section>

        <section
          className="statement"
          id="universo"
        >
          <div className="eyebrow">
            A experiência Winner
          </div>

          <h2>
            <span className="statement-line">
              O jogo muda.
            </span>
            <br />
            <span className="statement-line statement-muted">
              Seu equipamento
            </span>
            <br />
            <span className="statement-line statement-final">
              também.
            </span>
          </h2>

          <div className="statement-bottom">
            <p>
              Uma curadoria precisa de raquetes, calçados e
              acessórios para transformar treino em evolução.
              Tecnologia no detalhe. Confiança no ponto
              decisivo.
            </p>

            <a
              className="text-link"
              href="#shop"
            >
              Entrar na loja
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section
          className="engineering"
          id="raquetes"
        >
          <div className="engineering-head">
            <span className="eyebrow">
              01 / Engenharia
            </span>

            <h2>
              FEITA PARA
              <br />
              <span>O SEU JOGO.</span>
            </h2>
          </div>

          <div className="racket-stage">
            <div className="spec spec-one">
              <b>305 G</b>
              <span>PESO</span>
            </div>

            <div className="spec spec-two">
              <b>98 IN²</b>
              <span>CABEÇA</span>
            </div>

            <div className="spec spec-three">
              <b>16 × 19</b>
              <span>PADRÃO</span>
            </div>

            <div className="spec spec-four">
              <b>320 MM</b>
              <span>BALANÇO</span>
            </div>
          </div>

          <div className="engineering-foot">
            <p>
              Cada grama, cada corda, cada milímetro. A
              diferença entre jogar e controlar o jogo está
              no que você sente nas mãos.
            </p>

            <a
              className="text-link dark-link"
              href="#shop"
            >
              Ver detalhes
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section
          id="shop"
          className="shop-section"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                02 / Curadoria
              </span>

              <h2>
                Escolha seu <i>jogo.</i>
              </h2>
            </div>

            <a
              href="#shop"
              className="text-link dark-link"
            >
              Ver coleção completa
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="filter-row">
            {[
              'Todos',
              'Raquetes',
              'Calçados',
              'Acessórios',
              ...(liked.length ? ['Favoritos'] : []),
            ].map((item) => (
              <button
                key={item}
                className={
                  filter === item ? 'active' : ''
                }
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                liked={liked.includes(product.id)}
                onLike={() =>
                  setLiked(
                    liked.includes(product.id)
                      ? liked.filter(
                          (id) => id !== product.id,
                        )
                      : [...liked, product.id],
                  )
                }
                onAdd={() => setCart(cart + 1)}
              />
            ))}
          </div>
        </section>

        <section
          id="novidades"
          className="academy"
        >
          <img
            src={academyImage}
            alt="Quadra de saibro da Winner Academia"
          />

          <div className="academy-shade" />

          <div className="academy-content">
            <span className="eyebrow">
              03 / Winner Academia
            </span>

            <h2>
              TREINE COMO
              <br />
              <span>QUEM COMPETE.</span>
            </h2>

            <a
              className="button button-green"
              href="#footer"
            >
              Conheça a Winner
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="academy-stats">
            <div className="academy-stat">
              <b>07</b>
              <span>Quadras de saibro</span>
            </div>

            <div className="academy-stat">
              <b>07</b>
              <span>Beach tennis</span>
            </div>

            <div className="academy-stat">
              <b>01</b>
              <span>Padel</span>
            </div>

            <div className="academy-stat">
              <b>01</b>
              <span>Pickleball</span>
            </div>
          </div>
        </section>

        <footer id="footer">
          <div className="footer-lead">
            <div>
              <a
                className="wordmark"
                href="#top"
                aria-label="Winner"
              >
                <img
                  className="official-logo"
                  src={winnerLogo}
                  alt="Winner"
                />
              </a>

              <p>Seu próximo ponto começa aqui.</p>
            </div>

            <div className="newsletter">
              <span>Entre para o jogo.</span>

              <div>
                <input
                  type="email"
                  aria-label="Seu melhor e-mail"
                  placeholder="Seu melhor e-mail"
                />

                <button aria-label="Assinar newsletter">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="footer-columns">
            <div>
              <b>LOJA</b>
              <a href="#shop">Raquetes</a>
              <a href="#shop">Calçados</a>
              <a href="#shop">Acessórios</a>
              <a href="#shop">Novidades</a>
            </div>

            <div>
              <b>WINNER</b>
              <a href="#universo">Academia</a>
              <a href="#shop">Winner Store</a>
              <a href="#novidades">Eventos</a>
              <a href="#footer">Contato</a>
            </div>

            <div>
              <b>AJUDA</b>
              <a href="#footer">Entrega</a>
              <a href="#footer">Trocas</a>
              <a href="#footer">Privacidade</a>
              <a href="#footer">Termos</a>
            </div>

            <div>
              <b>SIGA</b>
              <a href="#footer">Instagram</a>
              <a href="#footer">WhatsApp</a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Winner Academia de Tênis</span>
            <span>São Paulo, Brasil</span>
            <span>Feito para o próximo ponto.</span>
          </div>
        </footer>
      </main>
    </>
  )
}