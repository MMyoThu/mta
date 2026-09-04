export type Hobby = {
  id: string
  title: string
  tag: string
  description: string
  featured?: boolean
}

export type Interest = {
  id: string
  title: string
  description: string
}

export const hobbies: Hobby[] = [
  {
    id: 'football',
    title: 'Football',
    tag: 'On the pitch',
    featured: true,
    description:
      'I play football whenever I can. The sprint, the pass, and playing as a team keep me sharp away from the screen.',
  },
  {
    id: 'chinlone',
    title: 'Chinlone',
    tag: 'Myanmar sport',
    description:
      'Chinlone is Myanmar’s cane-ball game — keep the ball alive with foot, knee, and head. I love the rhythm and the circle.',
  },
  {
    id: 'camera',
    title: 'Camera',
    tag: 'Light & frame',
    description:
      'I carry a camera for quiet frames: streets, evening light, and the small scenes that disappear if you wait.',
  },
  {
    id: 'fishing',
    title: 'Fishing',
    tag: 'By the water',
    description:
      'Slow mornings with a rod. Patience, still water, and the pause between casts — a different kind of focus.',
  },
  {
    id: 'coding',
    title: 'Coding',
    tag: 'After hours',
    description:
      'I still code for fun — side ideas, new tools, and the satisfaction of making something work on my own time.',
  },
  {
    id: 'reading',
    title: 'Reading',
    tag: 'On the page',
    description:
      'Books and long articles that stretch how I think, from software and systems to stories that stay with me.',
  },
]

export const interests: Interest[] = [
  {
    id: 'learning-it',
    title: 'Learning IT',
    description: 'New languages, tools, and ways of building — I like staying curious in this field.',
  },
  {
    id: 'travelling',
    title: 'Travelling',
    description: 'New cities, food, and the reset that comes with being somewhere unfamiliar.',
  },
  {
    id: 'boxing',
    title: 'Boxing',
    description: 'Footwork, timing, and the discipline of training. I follow the sport and the craft.',
  },
  {
    id: 'watching-football',
    title: 'Watching football',
    description: 'Match nights, good goals, and following the game as a fan — not only as a player.',
  },
]
