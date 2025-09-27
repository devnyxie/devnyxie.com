export default defineAppConfig({
  global: {
    picture: {
      src: "/pfp.jpg",
      alt: "My profile picture",
    },
    meetingLink: "https://cal.com/tim-afanasiev-7q9d0s",
    email: "timbusinez@gmail.com",
    available: true,
  },
  ui: {
    colors: {
      primary: "black",
      neutral: "neutral",
    },
    navigationMenu: {
      slots: {
        label:
          "w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2 py-1.5",
        link: "group relative w-full flex items-center gap-1.5 font-normal text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
        linkLeadingIcon: "shrink-0 size-5",
        linkTrailingIcon:
          "size-3 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200",
        // dropdown: items-center added to center icons vertically
        childLink:
          "group relative size-full flex items-center text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
        // dropdown: size and margin added to the icons
        childLinkIcon: "size-4 shrink-0 mr-2",
        viewportWrapper:
          "absolute top-full left-auto right-0 flex min-w-40 max-w-[320px]",
      },
      // variants: {
      //   color: {
      //     primary: {
      //       link: "focus-visible:before:ring-primary",
      //       childLink: "focus-visible:before:ring-primary",
      //     },
      //     secondary: {
      //       link: "focus-visible:before:ring-secondary",
      //       childLink: "focus-visible:before:ring-secondary",
      //     },
      //     success: {
      //       link: "focus-visible:before:ring-success",
      //       childLink: "focus-visible:before:ring-success",
      //     },
      //     info: {
      //       link: "focus-visible:before:ring-info",
      //       childLink: "focus-visible:before:ring-info",
      //     },
      //     warning: {
      //       link: "focus-visible:before:ring-warning",
      //       childLink: "focus-visible:before:ring-warning",
      //     },
      //     error: {
      //       link: "focus-visible:before:ring-error",
      //       childLink: "focus-visible:before:ring-error",
      //     },
      //     neutral: {
      //       link: "focus-visible:before:ring-inverted",
      //       childLink: "focus-visible:before:ring-inverted",
      //     },
      //   },
      //   highlightColor: {
      //     primary: "",
      //     secondary: "",
      //     success: "",
      //     info: "",
      //     warning: "",
      //     error: "",
      //     neutral: "",
      //   },
      //   variant: {
      //     pill: "",
      //     link: "",
      //   },
      //   orientation: {
      //     horizontal: {
      //       root: "items-center justify-between",
      //       list: "flex items-center",
      //       item: "py-2",
      //       link: "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
      //       childList: "grid p-2",
      //       childLink: "px-3 py-2 gap-2 before:inset-x-px before:inset-y-0",
      //       childLinkLabel: "font-medium",
      //       content:
      //         "absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto",
      //     },
      //     vertical: {
      //       root: "flex-col",
      //       link: "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0",
      //       childLabel: "px-1.5 py-0.5",
      //       childLink: "p-1.5 gap-1.5 before:inset-y-px before:inset-x-0",
      //     },
      //   },
      // },
      compoundVariants: [
        {
          orientation: "horizontal",
          contentOrientation: "horizontal",
          class: {
            childList: "grid-cols-1 gap-0",
          },
        },
      ],
    },
  },
});
