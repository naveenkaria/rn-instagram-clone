import { USERS } from "./userData";

export const POSTS = [
  {
    imageUrl: 'https://qph.cf2.quoracdn.net/main-qimg-6653979e5fcfc0c422aabf5a1a3879d2-pjlq',
    user: USERS[0].name,
    likes: 7870,
    caption: "Train Ride to Hogwarts.",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "theqazman",
        comment: "Wow! This build looks fire.",
      },
      {
        user: "amaanth.dev",
        comment: "Once I wake up, I'll finally be ready to code.",
      },
    ],
  },
  {
    imageUrl: 'https://static.javatpoint.com/top10-technologies/images/top-10-hollywood-actress3.png',
    user: USERS[3].name,
    likes: 8870,
    caption: "Train Ride to Hogwarts.",
    profile_picture: USERS[3].image,
    comments: [
      {
        user: "theqazman",
        comment: "Wow! This build looks fire.",
      },
      {
        user: "amaanth.dev",
        comment: "Once I wake up, I'll finally be ready to code.",
      },
    ],
  },
];
