import React from "react"
import ZyfloWindowMockup from "@/components/ui/window-mockup"
import ZyfloNavbar from "@/components/zyflo/navbar"
import { Button } from "@/components/ui/button"
import { FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa"
import ZyfloWindowMockupPlaceholder from "@/components/ui/window-mockup-placeholder"

const ZyfloNavbarExamples = ({ key }: { key: string }) => {
  return (
    <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-2" key={key}>
      <div className="flex flex-col items-start justify-start gap-2">
        <h5 className="mb-4 mt-8">With Image Logo</h5>
        <ZyfloWindowMockup className="h-full max-w-2xl !p-0">
          <div className="relative w-full">
            <ZyfloNavbar
              items={[
                { title: "Home", href: "/" },
                { title: "Products", href: "/products" },
                { title: "About", href: "/about" }
              ]}
              logo={{
                src: "/images/logos/normal-zyflo-logo-transparent.svg",
                alt: "Company Logo",
                width: 150,
                height: 50
              }}
              backdropBlur={false}
              className="absolute top-0 z-0 w-full bg-primary/[0.03]"
            />
          </div>
          <ZyfloWindowMockupPlaceholder />
        </ZyfloWindowMockup>
      </div>

      <div className="flex flex-col items-start justify-start gap-2">
        <h5 className="mb-4 mt-8">With Text Logo and Custom Heading</h5>
        <ZyfloWindowMockup className="h-full max-w-2xl !p-0">
          <div className="relative w-full">
            <ZyfloNavbar
              items={[
                { title: "Home", href: "/", icon: <FaHome /> },
                { title: "About", href: "/about", icon: <FaInfoCircle /> },
                { title: "Contact", href: "/contact", icon: <FaEnvelope /> }
              ]}
              logo={{ text: "Icon Nav", as: "h5" }}
              backdropBlur={false}
              className="absolute top-0 z-0 w-full bg-primary/[0.03]"
            />
            <ZyfloWindowMockupPlaceholder />
          </div>
        </ZyfloWindowMockup>
      </div>

      <div className="flex flex-col items-start justify-start gap-2">
        <h5 className="mb-4 mt-8">With Icons in Navigation Items</h5>
        <ZyfloWindowMockup className="h-full max-w-2xl !p-0">
          <div className="relative w-full">
            <ZyfloNavbar
              items={[
                { title: "Home", href: "/", icon: <FaHome /> },
                { title: "About", href: "/about", icon: <FaInfoCircle /> },
                { title: "Contact", href: "/contact", icon: <FaEnvelope /> }
              ]}
              logo={{ text: "Icon Nav", as: "h5" }}
              backdropBlur={false}
              className="absolute top-0 z-0 w-full bg-primary/[0.03]"
            />
            <ZyfloWindowMockupPlaceholder />
          </div>
        </ZyfloWindowMockup>
      </div>

      <div className="flex flex-col items-start justify-start gap-2">
        <h5 className="mb-4 mt-8">With Mobile Navigation Footer</h5>
        <ZyfloWindowMockup className="h-full max-w-2xl !p-0">
          <div className="relative w-full">
            <ZyfloNavbar
              items={[
                { title: "Dashboard", href: "/dashboard" },
                { title: "Settings", href: "/settings" }
              ]}
              logo={{ text: "Admin Panel", as: "h5" }}
              backdropBlur={false}
              className="absolute top-0 z-0 w-full bg-primary/[0.03]"
              mobileNavFooter={<Button>Logout</Button>}
            />
            <ZyfloWindowMockupPlaceholder />
          </div>
        </ZyfloWindowMockup>
      </div>

      <div className="flex flex-col items-start justify-start gap-2">
        <h5 className="mb-4 mt-8">Centered Mobile Navigation</h5>
        <ZyfloWindowMockup className="h-full max-w-2xl !p-0">
          <div className="relative w-full">
            <ZyfloNavbar
              items={[
                { title: "Shop", href: "/shop" },
                { title: "Cart", href: "/cart" },
                { title: "Account", href: "/account" }
              ]}
              logo={{ text: "E-Commerce", as: "h5" }}
              backdropBlur={false}
              className="absolute top-0 z-0 w-full bg-primary/[0.03]"
              mobileNavbarCentered={true}
            />
          </div>
          <ZyfloWindowMockupPlaceholder />
        </ZyfloWindowMockup>
      </div>
    </div>
  )
}

export default ZyfloNavbarExamples
