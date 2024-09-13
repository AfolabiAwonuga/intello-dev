export const userData = [
  {
    id: 1,
    avatar: "/User1.png",
    messages: [
      {
        id: 1,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "Hey!",
      },
      {
        id: 2,
        avatar: "/User1.png",
        name: "Jane Doe",
        message:
          "Hey, Jakob Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus impedit distinctio autem placeat consequuntur fugit dignissimos pariatur! Facilis sit nulla unde perspiciatis. Ipsa eaque quidem quibusdam obcaecati ad, illo rem nobis libero quo. Atque totam iste quaerat? Eum deleniti, quos repudiandae dolorem laudantium veniam nisi natus perspiciatis consequuntur voluptatem pariatur recusandae, consectetur delectus.",
      },
      {
        id: 3,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "How are you?",
      },
      {
        id: 4,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "I am good, you?",
      },
      {
        id: 5,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "I am good too!",
      },
      {
        id: 6,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "That is good to hear!",
      },
      {
        id: 7,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "How has your day been so far?",
      },
      {
        id: 8,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "It has been good. How about you?",
      },
      {
        id: 9,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "I had a relaxing day. Just catching up on some reading.",
      },
      {
        id: 10,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "That sounds nice! What are you reading?",
      },
      {
        id: 11,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "I’m reading a novel by Agatha Christie. It’s quite gripping!",
      },
      {
        id: 12,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message:
          "Agatha Christie is a great author. Which book are you reading?",
      },
      {
        id: 13,
        avatar: "/User1.png",
        name: "Jane Doe",
        message:
          "I’m reading 'Murder on the Orient Express'. Have you read it?",
      },
      {
        id: 14,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "Yes, it’s one of my favorites! The ending is fantastic.",
      },
      {
        id: 15,
        avatar: "/User1.png",
        name: "Jane Doe",
        message:
          "I’m looking forward to the ending. I’ve heard so many good things about it.",
      },
      {
        id: 16,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message:
          "You won’t be disappointed. Christie’s plot twists are always intriguing.",
      },
      {
        id: 17,
        avatar: "/User1.png",
        name: "Jane Doe",
        message:
          "I’ll definitely keep that in mind. Thanks for the recommendation!",
      },
      {
        id: 18,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "Anytime! Let me know what you think once you finish it.",
      },
      {
        id: 19,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "Will do! By the way, do you have any plans for the weekend?",
      },
      {
        id: 20,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "Not yet. I’m thinking of going for a hike. How about you?",
      },
      {
        id: 21,
        avatar: "/User1.png",
        name: "Jane Doe",
        message:
          "I might visit a museum. I’ve heard there’s a new exhibition opening.",
      },
      {
        id: 22,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message: "That sounds interesting! Museums can be a lot of fun.",
      },
      {
        id: 23,
        avatar: "/User1.png",
        name: "Jane Doe",
        message:
          "Yes, I enjoy exploring new exhibits. I’ll let you know how it goes!",
      },
      {
        id: 24,
        avatar: "/LoggedInUser.jpg",
        name: "Jakob Hoeg",
        message:
          "Great! Looking forward to hearing about it. Have a good rest of your day!",
      },
      {
        id: 25,
        avatar: "/User1.png",
        name: "Jane Doe",
        message: "Thanks, Jakob! You too. Enjoy your hike!",
      },
    ],
    name: "Jane Doe",
  },
  // {
  //   id: 2,
  //   avatar: "/User2.png",
  //   name: "John Doe",
  // },
  // {
  //   id: 3,
  //   avatar: "/User3.png",
  //   name: "Elizabeth Smith",
  // },
  // {
  //   id: 4,
  //   avatar: "/User4.png",
  //   name: "John Smith",
  // },
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
  id: 5,
  avatar: "/LoggedInUser.jpg",
  name: "Jakob Hoeg",
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}
