export interface MenuItem {
  heading?: string;
  subject?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
  order?: Number
}
const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        subject: "public",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 0
      },
      {
        heading: "center",
        subject: "center",
        route: "/Center-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 2
      },
      {
        heading: "exam",
        subject: "exam",
        route: "/Exam-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 11
      },
      {
        heading: "homework",
        subject: "homework",
        route: "/Homework-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 8
      },
      {
        heading: "level",
        subject: "level",
        route: "/Level-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 4
      },
      {
        heading: "student",
        subject: "student",
        route: "/Student-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 6
      },
      {
        sectionTitle: "systemSettings",
        route: "/systemSettings",
        keenthemesIcon: "element-plus",
        bootstrapIcon: "bi-archive",
        order: 1,
        sub: [              {
                heading: "businessUnit",
                subject: "businessUnit",
                route: "/businessUnit-list",
                order: 2
              },              {
                heading: "userRole",
                subject: 'permission',
                route: "/userRole-list",
                order: 3
            },              {
                heading: "user",
                subject: "user",
                route: "/user-list",
                order: 1
              },            {
              heading: "workflows",
              subject: "eventConfiguration",
              route: "/eventConfiguration-list",
              order: 4 //todo temperoray will change
            },        ].sort((a, b) => a.order - b.order),
      },
      {
        heading: "teacher",
        subject: "teacher",
        route: "/Teacher-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 3
      },
      {
        heading: "video",
        subject: "video",
        route: "/Video-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 5
      },
      {
        heading: "attendance",
        subject: "attendance",
        route: "/attendance-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 9
      },
      {
        heading: "result",
        subject: "result",
        route: "/result-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 7
      },
      {
        heading: "submissions",
        subject: "submissions",
        route: "/submissions-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 13
      },
      {
        heading: "subscription",
        subject: "subscription",
        route: "/subscription-list",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        order: 10
      },

    ].sort((a, b) => a.order - b.order),
  },
];

export default MainMenuConfig;

