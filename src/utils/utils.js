const categories = {
  animals: [
    { word: "ELEPHANT", hints: [
      "I carry a nose where others wear a hand; my steps remember forests long after I leave. What am I?",
      "A moving grey cathedral: I drink through a living hose and my shadow arrives before my feet. Who am I?"
    ]},
    { word: "LION", hints: [
      "My crown is not gold but grows from my skin; my silence can command a plain. Who am I?",
      "I rule without a throne: my voice is thunder and my mane is the flag. Who am I?"
    ]},
    { word: "TIGER", hints: [
      "I wear sunlight trapped behind bars, yet no cage holds me when I choose the night. What am I?",
      "Orange flame, black script—my coat is a warning written by nature. What am I?"
    ]},
    { word: "DOLPHIN", hints: [
      "I speak in clicks, draw maps with sound, and laugh without lips beneath the waves. Who am I?",
      "I hunt with echoes and play with boats; I breathe air but live in water. Who am I?"
    ]},
    { word: "KANGAROO", hints: [
      "I travel by folding the ground, and I keep my smallest passenger in a living pocket. What am I?",
      "My front door is a pouch; my footsteps are leaps that skip the map. What am I?"
    ]},
    { word: "GIRAFFE", hints: [
      "My head visits leaves that never meet the grass; I drink like a bridge bending to a river. Who am I?",
      "I eat from ceilings of trees and wear spots like scattered shadows. Who am I?"
    ]},
    { word: "RHINOCEROS", hints: [
      "I am a tank built from hide, and my nose carries a spear I did not forge. What am I?",
      "A living boulder with a borrowed lance—my armor is skin, my temper is momentum. What am I?"
    ]},
    { word: "PENGUIN", hints: [
      "I wear formal clothes to a banquet of ice, and I fly best where air cannot follow. Who am I?",
      "I am a bird that chooses the sea for a sky; my wings became paddles. Who am I?"
    ]},
    { word: "ZEBRA", hints: [
      "I am a horse written in ink, and my stripes confuse hungry arithmetic. What am I?",
      "Black and white, but never a page: my pattern is camouflage made of questions. What am I?"
    ]},
    { word: "EAGLE", hints: [
      "I borrow the sky as my roadway, and my eyes can read the ground like a book. Who am I?",
      "I write circles in the air and punctuate them with a dive; my gaze is a distant microscope. Who am I?"
    ]}
  ],

  countries: [
    { word: "SOUTH AFRICA", hints: [
      "I touch two oceans and wear a table as a landmark; my rainbow is political, not meteorological. Where am I?",
      "At the continent’s lower hinge I meet two seas; I speak many tongues under one flag. Where am I?"
    ]},
    { word: "BRAZIL", hints: [
      "My lungs are green and loud, my festival dances in the streets, and a giant river signs my name. Where am I?",
      "A forest the size of legend lives in me; my music turns sidewalks into parades. Where am I?"
    ]},
    { word: "FRANCE", hints: [
      "I measure revolutions in ideas, toast with bubbles, and my iron needle points from a famous city. Where am I?",
      "My bread is daily ritual, my art hangs like history, and my tower is a metal exclamation. Where am I?"
    ]},
    { word: "JAPAN", hints: [
      "I am an island chain where trains apologize, blossoms fall like snow, and sunrise is a national symbol. Where am I?",
      "I fold old temples beside neon; my spring arrives in petals and my mornings begin early. Where am I?"
    ]},
    { word: "AUSTRALIA", hints: [
      "I am both a country and a continent; my center is red, and my animals feel invented. Where am I?",
      "I keep deserts in my middle and reefs at my edge; my wildlife looks like mythology. Where am I?"
    ]},
    { word: "CANADA", hints: [
      "I stitch provinces under a maple leaf, and my winter can outlast a promise. Where am I?",
      "I share a long border with a louder neighbor; my lakes behave like inland seas. Where am I?"
    ]},
    { word: "INDIA", hints: [
      "I speak in many tongues, count a billion stories, and my democracy votes in a tide. Where am I?",
      "Spice and scripture, cinema and code—my contradictions still rhyme. Where am I?"
    ]},
    { word: "CHINA", hints: [
      "A dragon of stone winds across my hills, and my cities grow faster than legends can keep up. Where am I?",
      "My history is dynasties deep; my wall is famous, but my scale is larger. Where am I?"
    ]},
    { word: "ITALY", hints: [
      "I am a boot that kicks the sea; my ruins argue with my recipes about what lasts longer. Where am I?",
      "I pour history into stone and sauce into bowls; my shape is footwear on the map. Where am I?"
    ]},
    { word: "GERMANY", hints: [
      "I build precision into machines, and I raise a toast in tents that become temporary cities. Where am I?",
      "My highways sprint, my forests brood, and my festivals pour foam like celebration. Where am I?"
    ]}
  ],

  authors: [
    { word: "EMERSON", hints: [
      "I preached self-reliance before it had a slogan; my essays walk like sermons without pews. Who am I?",
      "I told the soul to stand upright; my sentences are ladders for the individual. Who am I?"
    ]},
    { word: "TWAIN", hints: [
      "I signed my name like a riverboat call, and I sent two boys down a mighty stream. Who am I?",
      "My humor wore a white suit; I steered satire along the Mississippi. Who am I?"
    ]},
    { word: "DICKENS", hints: [
      "I filled foggy streets with orphans and creditors, and my ghosts taught December to repent. Who am I?",
      "I turned London’s soot into stories; my characters feel like neighbors you can’t forget. Who am I?"
    ]},
    { word: "AUSTEN", hints: [
      "I fenced with manners and marriage, and my sharpest weapon was a polite sentence. Who am I?",
      "I mapped love through social rules; my irony smiles while it judges. Who am I?"
    ]},
    { word: "TOLSTOY", hints: [
      "I wrote a war so vast it needed families to hold it; peace was never simple in my pages. Who am I?",
      "I asked how to live while describing how nations collide; my epics breathe like continents. Who am I?"
    ]},
    { word: "HEMINGWAY", hints: [
      "I carved my prose like stone, and I sailed with an old man who fought the sea for meaning. Who am I?",
      "I wrote what’s left unsaid; my heroes bleed quietly under bright skies. Who am I?"
    ]},
    { word: "ORWELL", hints: [
      "I warned that language can be handcuffs, and I watched a farm rehearse a tyranny. Who am I?",
      "I measured truth against power; my nightmares had slogans and telescreens. Who am I?"
    ]},
    { word: "SHAKESPEARE", hints: [
      "I put kings and clowns on the same stage, and my words became a dictionary wearing drama. Who am I?",
      "I wrote storms for fathers, daggers for ambition, and jokes for graveyards. Who am I?"
    ]},
    { word: "WILDE", hints: [
      "My humor smiled like a dagger, and I painted a portrait that paid the moral debt. Who am I?",
      "I turned wit into weaponry; my plays sparkle while my truth cuts. Who am I?"
    ]},
    { word: "ROWLING", hints: [
      "I built a school hidden behind a wall, where a scar became a destiny. Who am I?",
      "I made wands feel ordinary; my world begins on a platform between numbers. Who am I?"
    ]}
  ],

  foods: [
    { word: "PIZZA", hints: [
      "I am a round argument of dough; my answer is melted, and my commas are toppings. What am I?",
      "I arrive in triangles from a circle; my roof is cheese and my floor is crust. What am I?"
    ]},
    { word: "SUSHI", hints: [
      "I wrap the sea in rice and silence, and I arrive as small as patience. What am I?",
      "A tidy bite where ocean meets grain; I’m rolled like a secret in paper-thin algae. What am I?"
    ]},
    { word: "BURGER", hints: [
      "Two buns hold a planet of flavor; I am stacked proof that gravity is delicious. What am I?",
      "I’m a handheld tower: layers negotiate between bread at top and bread at bottom. What am I?"
    ]},
    { word: "SALAD", hints: [
      "I am a garden in a bowl where dressing is the weather. What am I?",
      "Leaves and colors meet without cooking; my sauce is the only fire. What am I?"
    ]},
    { word: "TACO", hints: [
      "I am a folded moon of maize, cradling a crowd of spices. What am I?",
      "I’m a pocket that isn’t sewn: a shell that holds a fiesta in one hand. What am I?"
    ]},
    { word: "STEAK", hints: [
      "I am the fireplace’s favorite guest—seared outside, secret inside. What am I?",
      "A slice of muscle made ceremonial; the grill writes my name in char. What am I?"
    ]},
    { word: "PASTA", hints: [
      "I am flour taught to swim; my shapes are grammar for sauce. What am I?",
      "I wear many bodies—tubes, ribbons, shells—yet I taste like home when boiled. What am I?"
    ]},
    { word: "SOUP", hints: [
      "I am a warm story you can sip; my ingredients become a single voice. What am I?",
      "I’m a bowl of weather: steam above, comfort below, solids drifting like thoughts. What am I?"
    ]},
    { word: "CHOCOLATE", hints: [
      "I begin as a bitter bean and end as comfort; my sweetness is engineered by time. What am I?",
      "Dark or milk, I melt into reassurance; my origin is a seed that learned dessert. What am I?"
    ]},
    { word: "BREAD", hints: [
      "I am air trapped in grain, risen by invisible workers, and sliced into mornings. What am I?",
      "Flour becomes a pillow of crumbs; yeast writes bubbles into my body. What am I?"
    ]}
  ],

  instruments: [
    { word: "GUITAR", hints: [
      "My body is a wooden echo; six roads stretch across me, and fingers become weather. What am I?",
      "I sing when you strum my ribs; my voice lives in strings stretched over a hollow heart. What am I?"
    ]},
    { word: "PIANO", hints: [
      "I speak in hammers wearing velvet; my teeth are keys, and my voice is a room. What am I?",
      "A furniture-sized orchestra: I whisper or thunder depending on how you fall on me. What am I?"
    ]},
    { word: "DRUMS", hints: [
      "I am a heartbeat multiplied; sticks translate motion into thunder. What am I?",
      "My skin is struck to speak; I turn rhythm into a physical force. What am I?"
    ]},
    { word: "VIOLIN", hints: [
      "A bow pulls my voice from strings; I can cry without tears and sing without breath. What am I?",
      "I rest on a shoulder like a secret; my songs are drawn, not blown. What am I?"
    ]},
    { word: "FLUTE", hints: [
      "I am a hollow line of wind; your breath becomes my melody’s ink. What am I?",
      "I speak when air is sliced on an edge; my music is a thread of breath. What am I?"
    ]},
    { word: "TRUMPET", hints: [
      "I shout through brass and valves; my sound is a bright flag in the air. What am I?",
      "I’m a metal megaphone with buttons; I can announce victory or jazz. What am I?"
    ]},
    { word: "HARP", hints: [
      "I am a ladder of strings; angels borrow me when silence needs pattern. What am I?",
      "I look like a frame for light; my notes fall like water from plucked threads. What am I?"
    ]},
    { word: "SAXOPHONE", hints: [
      "I am metal that speaks like smoke; jazz uses me to bend straight lines. What am I?",
      "A brass body with a wooden tongue—my voice can swagger or sigh. What am I?"
    ]},
    { word: "CELLO", hints: [
      "I sit between knees like a secret; my low notes are rooms you can live in. What am I?",
      "I’m a violin grown deep; I hug the floor while my bow tells long stories. What am I?"
    ]},
    { word: "CLARINET", hints: [
      "A single reed wakes my voice; I can be velvet or mischievous in one breath. What am I?",
      "I’m a black cylinder with silver stars; one reed turns breath into laughter or lament. What am I?"
    ]}
  ],

  literature: [
    { word: "POETRY", hints: [
      "I say more by leaving gaps; my meaning hides between beats. What am I?",
      "I compress oceans into teaspoons; I rhyme sometimes, but I always echo. What am I?"
    ]},
    { word: "NOVEL", hints: [
      "I am a long lie that tells the truth; my chapters are footsteps through a world. What am I?",
      "I’m a marathon of pages; my characters age while your evening disappears. What am I?"
    ]},
    { word: "ESSAY", hints: [
      "I am thinking in public—short enough to finish, sharp enough to linger. What am I?",
      "I’m an argument in a suit: ideas walking in paragraphs. What am I?"
    ]},
    { word: "DRAMA", hints: [
      "I live in dialogue and consequence; my words are meant to be worn, not only read. What am I?",
      "I am conflict with stage directions; my meaning arrives through voices, not narration. What am I?"
    ]},
    { word: "FICTION", hints: [
      "I am invention with a pulse; I never happened, yet I can change you. What am I?",
      "I’m a crafted dream: untrue in fact, true in feeling. What am I?"
    ]},
    { word: "NONFICTION", hints: [
      "I promise the world as it was; my imagination is disciplined by evidence. What am I?",
      "I refuse to pretend; my drama is real and my sources are my spine. What am I?"
    ]},
    { word: "MYSTERY", hints: [
      "I invite you to chase a shadow; the answer arrives last, pretending it was obvious. What am I?",
      "I am a locked room in book-form; clues fall like crumbs and doubt is the guide. What am I?"
    ]},
    { word: "FANTASY", hints: [
      "I open a door where rules are negotiable; dragons are metaphors with teeth. What am I?",
      "I trade physics for wonder; maps matter, magic argues, and reality blinks. What am I?"
    ]},
    { word: "BIOGRAPHY", hints: [
      "I am a life poured into pages; I turn years into a single narrative spine. What am I?",
      "I chase a person through time; facts become a portrait painted with dates. What am I?"
    ]},
    { word: "COMEDY", hints: [
      "I am truth wearing a grin; I disarm you, then strike with insight. What am I?",
      "I turn pain into timing; laughter is my way of telling you the point. What am I?"
    ]}
  ],

  sports: [
    { word: "SOCCER", hints: [
      "Ninety minutes of orbiting feet; the planet is round and the goal is a mouth. What am I?",
      "Twenty-two chase one idea; the net is the sentence, the ball is the noun. What am I?"
    ]},
    { word: "BASKETBALL", hints: [
      "I bounce like impatience, and I aim for a circle that forgives nothing. What am I?",
      "A wooden court, a high ring—points are earned by rising against gravity. What am I?"
    ]},
    { word: "TENNIS", hints: [
      "I argue over a net with strings; love is the score, not the feeling. What am I?",
      "Two (or four) trade thunderclaps; the line decides truth with chalk. What am I?"
    ]},
    { word: "GOLF", hints: [
      "I chase a quiet hole across loud distances; my victories are measured in fewer mistakes. What am I?",
      "I walk miles to hit a ball inches; the smallest target makes the biggest ego. What am I?"
    ]},
    { word: "CRICKET", hints: [
      "I defend three sticks, trade turns in patience, and measure time in overs. What am I?",
      "A bat meets a bouncing riddle; runs are stolen between safe islands. What am I?"
    ]},
    { word: "SWIMMING", hints: [
      "I race without roads; the finish line is water’s edge and breath is strategy. What am I?",
      "I move through resistance for speed; my lanes are rivers made by paint. What am I?"
    ]},
    { word: "BASEBALL", hints: [
      "I begin at home, leave it, then return; a bat negotiates with a fast circle. What am I?",
      "I pause, then explode: four bases like compass points, and one pitch to start a story. What am I?"
    ]},
    { word: "RUGBY", hints: [
      "I carry an oval secret through chaos; teamwork is armor and the field is a battlefield. What am I?",
      "No helmets, plenty of courage—an egg-shaped ball invites collisions and loyalty. What am I?"
    ]},
    { word: "VOLLEYBALL", hints: [
      "I keep the ball from touching earth; the net is our polite disagreement. What am I?",
      "Hands speak faster than feet; we volley a sphere over a fence of air. What am I?"
    ]},
    { word: "CYCLING", hints: [
      "Two wheels and one will; my engine is legs and my road is an argument with wind. What am I?",
      "I turn circles into distance; my race is a conversation between muscle and air. What am I?"
    ]}
  ],

  technologies: [
    { word: "COMPUTER", hints: [
      "I eat instructions and breathe results; my memory is not mine, yet I never forget when powered. What am I?",
      "I am a silent clerk of numbers; give me logic and I return decisions at speed. What am I?"
    ]},
    { word: "INTERNET", hints: [
      "I am a web with no spider; I connect strangers faster than neighbors. What am I?",
      "A thousand roads made of signals; my cities are servers and my language is packets. What am I?"
    ]},
    { word: "SMARTPHONE", hints: [
      "I am a pocket mirror that answers; I steal attention and return convenience. What am I?",
      "I ring, browse, pay, and remember—small as a palm, loud as a life. What am I?"
    ]},
    { word: "ROBOT", hints: [
      "I move without childhood; my purpose is programmed, yet my presence feels alive. What am I?",
      "A body for instructions: I work, repeat, and never tire unless my battery does. What am I?"
    ]},
    { word: "SOFTWARE", hints: [
      "I am the invisible half of a machine; I can be copied without losing the original. What am I?",
      "I am logic wearing a user interface; I live in updates and die in bugs. What am I?"
    ]},
    { word: "HARDWARE", hints: [
      "I am what you can drop, touch, and break; without me, code is only a thought. What am I?",
      "I’m the skeleton and organs of a device; programs ride on me like ghosts on a body. What am I?"
    ]},
    { word: "VIRTUAL REALITY", hints: [
      "I build worlds behind lenses; your body stays put while your senses travel. What am I?",
      "I trick your eyes into believing; a headset becomes a doorway and motion becomes place. What am I?"
    ]},
    { word: "ARTIFICIAL INTELLIGENCE", hints: [
      "I learn patterns, not feelings; I imitate minds by counting what they do. What am I?",
      "I’m a mirror made of math—trained on examples, fluent in probabilities. What am I?"
    ]},
    { word: "DRONE", hints: [
      "I fly without a pilot inside; my eyes can hover where feet cannot. What am I?",
      "A buzzing camera on wings; I obey a controller and ignore gravity’s usual rules. What am I?"
    ]},
    { word: "3D PRINTING", hints: [
      "I sculpt by stacking whispers of material; my objects are born from layers, not chisels. What am I?",
      "I manufacture by patience: thin slices become a solid thing, one layer at a time. What am I?"
    ]}
  ],

  historicalFigures: [
    { word: "WASHINGTON", hints: [
      "I led a rebellion, then refused a crown; my name became an address for power. Who am I?",
      "I crossed a cold river into history; I stepped away so the office could outgrow me. Who am I?"
    ]},
    { word: "LINCOLN", hints: [
      "I split a nation to keep it whole; my speeches were short and heavy. Who am I?",
      "A tall lawyer with a haunted war—my words stitched a country with grief. Who am I?"
    ]},
    { word: "EINSTEIN", hints: [
      "I bent time with thought; my hair became as famous as my equations. Who am I?",
      "I found that light keeps its secrets; my ideas made clocks disagree. Who am I?"
    ]},
    { word: "CLEOPATRA", hints: [
      "I ruled with politics and spectacle; my legend is sealed with an asp-shaped rumor. Who am I?",
      "A queen of the Nile who spoke in alliances; my name is perfume and power. Who am I?"
    ]},
    { word: "NELSON MANDELA", hints: [
      "I wore a cell like a season, then walked out to lead a nation into elections. Who am I?",
      "I turned imprisonment into patience; my smile outlived a regime. Who am I?"
    ]},
    { word: "JOAN OF ARC", hints: [
      "A teenager heard a calling louder than armies; I carried faith into battle and fire. Who am I?",
      "I wore armor instead of permission; my trial ended in flames, my legend in banners. Who am I?"
    ]},
    { word: "GHANDI", hints: [
      "I fought an empire without fists; my weapon was refusal, my uniform was cloth. Who am I?",
      "I made stillness into protest; my marches moved the world more than my strength. Who am I?"
    ]},
    { word: "DA VINCI", hints: [
      "I painted a smile that outlived kings, and I sketched machines before engines were common. Who am I?",
      "I lived between art and anatomy; my notebooks were futures wearing ink. Who am I?"
    ]},
    { word: "CHURCHILL", hints: [
      "I spoke in cigars and stubborn sentences; my words held a nation through bombed nights. Who am I?",
      "I traded despair for defiance in speeches; my bulldog spirit became policy. Who am I?"
    ]},
    { word: "MARIE CURIE", hints: [
      "I chased glowing secrets in dark rooms; my discoveries changed medicine and danger alike. Who am I?",
      "I measured invisible fire; my work lit hospitals and shortened my life. Who am I?"
    ]}
  ],

  landmarks: [
    { word: "GREAT WALL", hints: [
      "I am a serpent of stone across mountains; you can walk my back, but not my purpose. What am I?",
      "Built to keep danger out, I became a path for tourists in; I curve like history’s spine. What am I?"
    ]},
    { word: "EIFFEL TOWER", hints: [
      "I began as a temporary skeleton; now I pin the skyline with iron lace. What am I?",
      "An iron needle in a city of romance—once criticized, now adored. What am I?"
    ]},
    { word: "PYRAMIDS", hints: [
      "I am geometry turned into tombs; my shadows keep the sun’s schedule. What am I?",
      "Older than most alphabets, I rise from sand as triangles of eternity. What am I?"
    ]},
    { word: "STATUE OF LIBERTY", hints: [
      "I hold a torch I cannot use; my crown has seven rays and my feet are chained. What am I?",
      "A giant immigrant made of copper—gifted, grounded, and forever pointing light. What am I?"
    ]},
    { word: "MACHU PICCHU", hints: [
      "I hide above clouds in stone terraces; a lost city that wasn’t really lost to its people. What am I?",
      "High in the Andes I sit like a secret staircase of ruins; mist is my curtain. What am I?"
    ]},
    { word: "TAJ MAHAL", hints: [
      "I am love translated into marble; I watch my own reflection in water as if mourning. What am I?",
      "A white palace built from grief—symmetry so perfect it feels like prayer. What am I?"
    ]},
    { word: "COLOSSEUM", hints: [
      "I am a broken circle that once roared; my seats remember sand and spectacle. What am I?",
      "A stone mouth for crowds—gladiators fed my fame, time fed on me. What am I?"
    ]},
    { word: "MOUNT EVEREST", hints: [
      "I am the highest argument between earth and sky; climbers bargain with thin air to meet me. What am I?",
      "I wear snow like a crown; my height is famous, my mercy is not. What am I?"
    ]},
    { word: "GRAND CANYON", hints: [
      "A river wrote my biography with patience; I am a wound that became a wonder. What am I?",
      "I am a book of rock pages; the author is water and the plot is time. What am I?"
    ]},
    { word: "GREAT BARRIER REEF", hints: [
      "I am a living city of coral; my colors fade when the water runs too warm. What am I?",
      "A vast underwater metropolis—built by tiny architects, threatened by heat. What am I?"
    ]}
  ]
};

/**
 * Returns a random { word, hint, ... } object.
 * - Supports both legacy `hint: string` and new `hints: string[]`.
 * - Always returns a single `hint` string (randomly chosen if `hints` exists).
 */
export function getRandomWordWithHints(category) {
  let wordsWithHints;
  if (category && category !== "all categories") {
    wordsWithHints = categories[category];
  } else {
    wordsWithHints = [].concat(...Object.values(categories));
  }

  const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
  const picked = wordsWithHints[randomIndex];

  // Pick a random hint if multiple exist
  const hintPool = Array.isArray(picked.hints) && picked.hints.length
    ? picked.hints
    : (typeof picked.hint === "string" ? [picked.hint] : []);

  const hint = hintPool.length
    ? hintPool[Math.floor(Math.random() * hintPool.length)]
    : "";

  // Keep API backward-compatible: always provide `hint`
  return { ...picked, hint };
}

export { categories };
