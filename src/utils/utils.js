// utils.js
const categories = {
  animals: [
    { word: "ELEPHANT", hint: "A large mammal with a trunk." },
    { word: "LION", hint: "The king of the jungle." },
    { word: "TIGER", hint: "A large, striped feline." },
    { word: "DOLPHIN", hint: "An intelligent sea mammal." },
    { word: "KANGAROO", hint: "A marsupial from Australia." },
    { word: "GIRAFFE", hint: "Has a very long neck." },
    { word: "RHINOCEROS", hint: "A thick-skinned herbivore with one or two horns." },
    { word: "PENGUIN", hint: "A flightless bird that swims." },
    { word: "ZEBRA", hint: "A horse-like animal with black and white stripes." },
    { word: "EAGLE", hint: "A bird known for its sharp eyesight." }
  ],
  countries: [
    { word: "SOUTH AFRICA", hint: "A country on the southern tip of the African continent." },
    { word: "BRAZIL", hint: "Known for the Amazon Rainforest and Carnival." },
    { word: "FRANCE", hint: "Famous for the Eiffel Tower." },
    { word: "JAPAN", hint: "Land of the rising sun." },
    { word: "AUSTRALIA", hint: "A country and continent surrounded by the Indian and Pacific oceans." },
    { word: "CANADA", hint: "North American country known for maple syrup." },
    { word: "INDIA", hint: "The world's largest democracy." },
    { word: "CHINA", hint: "Known for the Great Wall." },
    { word: "ITALY", hint: "Famous for its art, architecture, and food." },
    { word: "GERMANY", hint: "Known for its engineering and beer festivals." }
  ],
  authors: [
    { word: "EMERSON", hint: "A champion of individualism and critic of societal pressures." },
    { word: "TWAIN", hint: "Author of 'The Adventures of Tom Sawyer'." },
    { word: "DICKENS", hint: "Wrote 'A Tale of Two Cities'." },
    { word: "AUSTEN", hint: "Known for 'Pride and Prejudice'." },
    { word: "TOLSTOY", hint: "Russian author of 'War and Peace'." },
    { word: "HEMINGWAY", hint: "Wrote 'The Old Man and the Sea'." },
    { word: "ORWELL", hint: "Author of '1984'." },
    { word: "SHAKESPEARE", hint: "Famous playwright from the Elizabethan era." },
    { word: "WILDE", hint: "Known for his wit and 'The Picture of Dorian Gray'." },
    { word: "ROWLING", hint: "Author of the 'Harry Potter' series." }
  ],
  foods: [
    { word: "PIZZA", hint: "A popular Italian dish with cheese and toppings." },
    { word: "SUSHI", hint: "Japanese dish featuring raw fish." },
    { word: "BURGER", hint: "A sandwich with a meat patty inside." },
    { word: "SALAD", hint: "A healthy dish usually made of vegetables." },
    { word: "TACO", hint: "A Mexican dish with a folded or rolled tortilla." },
    { word: "STEAK", hint: "A high-quality beef cut." },
    { word: "PASTA", hint: "An Italian dish, often served with sauce." },
    { word: "SOUP", hint: "A warm liquid food." },
    { word: "CHOCOLATE", hint: "A favorite sweet treat." },
    { word: "BREAD", hint: "A staple food made from flour and water." }
  ],
  instruments: [
    { word: "GUITAR", hint: "A stringed instrument played with fingers or a pick." },
    { word: "PIANO", hint: "A large keyboard instrument." },
    { word: "DRUMS", hint: "Percussion instruments played with sticks." },
    { word: "VIOLIN", hint: "A stringed instrument played with a bow." },
    { word: "FLUTE", hint: "A woodwind instrument played by blowing." },
    { word: "TRUMPET", hint: "A brass instrument with a bright sound." },
    { word: "HARP", hint: "A stringed instrument often associated with angels." },
    { word: "SAXOPHONE", hint: "A woodwind instrument used in jazz." },
    { word: "CELLO", hint: "A large stringed instrument." },
    { word: "CLARINET", hint: "A single-reeded woodwind instrument." }
  ],
  literature: [
    { word: "POETRY", hint: "Expressive writing often with rhythm or rhyme." },
    { word: "NOVEL", hint: "A long fictional narrative." },
    { word: "ESSAY", hint: "A short piece of nonfiction writing." },
    { word: "DRAMA", hint: "A genre involving dialogue and performance." },
    { word: "FICTION", hint: "Writing that is invented or imaginary." },
    { word: "NONFICTION", hint: "Writing based on real facts and information." },
    { word: "MYSTERY", hint: "A genre involving solving a crime or secret." },
    { word: "FANTASY", hint: "A genre involving magical or supernatural elements." },
    { word: "BIOGRAPHY", hint: "A written account of someone's life." },
    { word: "COMEDY", hint: "A genre aiming to entertain and amuse." }
  ],
  sports: [
    { word: "SOCCER", hint: "Played with a round ball and goals." },
    { word: "BASKETBALL", hint: "Played with a hoop and a bouncing ball." },
    { word: "TENNIS", hint: "Played with rackets and a small ball." },
    { word: "GOLF", hint: "Played with clubs and small white balls." },
    { word: "CRICKET", hint: "Played with a bat, ball, and wickets." },
    { word: "SWIMMING", hint: "A water-based sport." },
    { word: "BASEBALL", hint: "Played with a bat and a pitching mound." },
    { word: "RUGBY", hint: "Similar to American football but without padding." },
    { word: "VOLLEYBALL", hint: "Played with a net and a soft ball." },
    { word: "CYCLING", hint: "A sport involving bicycles." }
  ],
  technologies: [
    { word: "COMPUTER", hint: "A machine for processing data." },
    { word: "INTERNET", hint: "A global network connecting computers." },
    { word: "SMARTPHONE", hint: "A handheld device with multiple functions." },
    { word: "ROBOT", hint: "A machine capable of carrying out tasks." },
    { word: "SOFTWARE", hint: "Programs used to operate computers." },
    { word: "HARDWARE", hint: "Physical components of a computer." },
    { word: "VIRTUAL REALITY", hint: "A simulated experience using technology." },
    { word: "ARTIFICIAL INTELLIGENCE", hint: "Machines that mimic human intelligence." },
    { word: "DRONE", hint: "An unmanned aerial vehicle." },
    { word: "3D PRINTING", hint: "Creating objects layer by layer." }
  ],
  historicalFigures: [
    { word: "WASHINGTON", hint: "First President of the United States." },
    { word: "LINCOLN", hint: "U.S. President during the Civil War." },
    { word: "EINSTEIN", hint: "Famous physicist who developed the theory of relativity." },
    { word: "CLEOPATRA", hint: "Last active Pharaoh of Ancient Egypt." },
    { word: "NELSON MANDELA", hint: "South African President and anti-apartheid leader." },
    { word: "JOAN OF ARC", hint: "French heroine and military leader." },
    { word: "GHANDI", hint: "Leader of India's non-violent independence movement." },
    { word: "DA VINCI", hint: "Renaissance artist and inventor." },
    { word: "CHURCHILL", hint: "British Prime Minister during WWII." },
    { word: "MARIE CURIE", hint: "Pioneering scientist in radioactivity." }
  ],
  landmarks: [
    { word: "GREAT WALL", hint: "A famous structure in China." },
    { word: "EIFFEL TOWER", hint: "A famous structure in Paris." },
    { word: "PYRAMIDS", hint: "Ancient structures in Egypt." },
    { word: "STATUE OF LIBERTY", hint: "A symbol of freedom in New York." },
    { word: "MACHU PICCHU", hint: "An ancient Incan city in Peru." },
    { word: "TAJ MAHAL", hint: "A famous mausoleum in India." },
    { word: "COLOSSEUM", hint: "Ancient amphitheater in Rome." },
    { word: "MOUNT EVEREST", hint: "The world's highest mountain." },
    { word: "GRAND CANYON", hint: "A famous gorge in the United States." },
    { word: "GREAT BARRIER REEF", hint: "The world's largest coral reef system." }
  ]
};


export function getRandomWordWithHints(category) {
  let wordsWithHints;
  if (category && category !== "all categories") {
    wordsWithHints = categories[category];
  } else {
    // Concatenate all the words from all categories if no specific category is provided
    wordsWithHints = [].concat(...Object.values(categories));
  }
  const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
  return wordsWithHints[randomIndex];
}


