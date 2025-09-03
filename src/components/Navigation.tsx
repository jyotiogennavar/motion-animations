"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";

// ✅ Main Navigation Component
export default function Navigation() {
  return (
    // Root wrapper for navigation menu
    <NavigationMenu.Root className="relative flex justify-center w-full z-50">
      {/* Navigation Menu List */}
      <NavigationMenu.List className="flex justify-center bg-white p-1 rounded-lg list-none m-0">
        {/* === Menu Item: Interviews === */}
        <NavigationMenu.Item>
          {/* Trigger for dropdown */}
          <NavigationMenu.Trigger className="px-3 py-2 font-medium text-sm rounded-md cursor-pointer hover:bg-gray-100 transition">
            Interviews
          </NavigationMenu.Trigger>

          {/* Dropdown content */}
          <NavigationMenu.Content className="content absolute top-0 left-0">
            <ul className="grid p-6 gap-3 w-[500px] grid-cols-[0.75fr_1fr] list-none">
              {/* Highlighted first item */}
              <li className="row-span-3">
                <NavigationMenu.Link asChild>
                  <Link
                    href="/products"
                    className="flex flex-col justify-end bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-lg p-6 text-white no-underline select-none"
                  >
                    {/* Logo SVG */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 400 400"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="opacity-80"
                    >
                      <g clipPath="url(#clip0)">
                        <path d="M400 67.2214C..." fill="#ffffff" />
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="400" height="400" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    {/* Heading */}
                    <div className="text-lg font-medium mt-4 mb-2 opacity-60">
                      Lochie Axon
                    </div>
                    {/* Description */}
                    <p className="text-sm opacity-60 mix-blend-plus-lighter">
                      Lochie is a design engineer at Family.
                    </p>
                  </Link>
                </NavigationMenu.Link>
              </li>

              {/* Other list items */}
              <ListItem href="/products" title="Mariana Castilho">
                Product designer at poolside, previously Vercel.
              </ListItem>
              <ListItem href="/products" title="Henry Heffernan">
                A design engineer at Vercel working on v0.
              </ListItem>
              <ListItem href="/products" title="Dennis Brotzky">
                Co-founder of Fey, engineer who loves design.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* === Menu Item: Lessons === */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="px-3 py-2 font-medium text-sm rounded-md cursor-pointer hover:bg-gray-100 transition">
            Lessons
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="content absolute top-0 left-0">
            <ul className="grid p-6 gap-3 w-[564px] grid-flow-col grid-rows-3 list-none">
              <ListItem title="Theory" href="/lessons">
                Consists of 4 modules, 24 lessons and 50+ exercises.
              </ListItem>
              <ListItem title="Interviews" href="/lessons">
                Interviews with experts from companies like Vercel.
              </ListItem>
              <ListItem title="Discord" href="/lessons">
                Join an exclusive community on all things animation.
              </ListItem>
              <ListItem title="Walkthroughs" href="/lessons">
                Consists of 3 walkthroughs of high-quality components.
              </ListItem>
              <ListItem title="Vault" href="/lessons">
                A highly curated list of animation resources.
              </ListItem>
              <ListItem title="Certificate" href="/lessons">
                Get your certificate of completion after finishing 70% of the
                course.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* === Menu Item: Account (Direct Link) === */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="px-3 py-2 font-medium text-sm rounded-md cursor-pointer hover:bg-gray-100 transition">
            Account
          </NavigationMenu.Trigger>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      {/* Viewport for showing content */}
      <div className="absolute flex justify-center w-full top-full left-0">
        <NavigationMenu.Viewport className="viewport relative mt-2 bg-white rounded-md shadow-md overflow-hidden transition-all duration-250 ease w-[var(--radix-navigation-menu-viewport-width)] h-[var(--radix-navigation-menu-viewport-height)]" />
      </div>
    </NavigationMenu.Root>
  );
}

// ✅ Reusable ListItem component for links inside dropdown
function ListItem({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          href={href}
          className="block p-3 rounded-md hover:bg-gray-100 select-none text-sm no-underline"
        >
          <div className="font-medium mb-1 text-black">{title}</div>
          <p className="text-gray-700 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenu.Link>
    </li>
  );
}
