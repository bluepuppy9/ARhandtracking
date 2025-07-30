const ratdexData = {
  rat001: { name: 'Cheddar', description: 'Loves cheese and mischief.', caught: true, rarity: 'common' },
  rat002: { name: 'Whiskers', description: 'Fast and curious.', caught: false, rarity: 'common' },
  rat003: { name: 'Squeakster', description: 'Stealthy and smart.', caught: true, rarity: 'common' },
  rat004: { name: 'Nibble', description: 'Always chewing on wires.', caught: false, rarity: 'common' },
  rat005: { name: 'Scritch', description: 'Nocturnal troublemaker.', caught: true, rarity: 'common' },
  rat006: { name: 'Fuzzball', description: 'Fluffy and fearless.', caught: true, rarity: 'common' },
  rat007: { name: 'Scamper', description: 'Quick as lightning.', caught: true, rarity: 'common' },
  rat008: { name: 'Patch', description: 'Has a patch over one eye.', caught: false, rarity: 'common' },
  rat009: { name: 'Nugget', description: 'Tiny but brave.', caught: true, rarity: 'common' },
  rat010: { name: 'Crumbs', description: 'Always leaves a trail.', caught: true, rarity: 'common' },
  rat011: { name: 'Velvet', description: 'Soft fur, sharper mind.', caught: false, rarity: 'common' },
  rat012: { name: 'Toothpick', description: 'Thin but tenacious.', caught: true, rarity: 'common' },
  rat013: { name: 'Rattle', description: 'Likes to shake things up.', caught: true, rarity: 'common' },
  rat014: { name: 'Snickers', description: 'Always giggling.', caught: false, rarity: 'common' },
  rat015: { name: 'Zippy', description: 'Hard to catch.', caught: true, rarity: 'common' },

  rat016: { name: 'Shadow', description: 'Disappears into the dark.', caught: true, rarity: 'rare' },
  rat017: { name: 'Smudge', description: 'Always a little dirty.', caught: true, rarity: 'rare' },
  rat018: { name: 'Dash', description: 'Runs in zigzags.', caught: true, rarity: 'rare' },
  rat019: { name: 'Squirt', description: 'The smallest of them all.', caught: false, rarity: 'rare' },
  rat020: { name: 'Mittens', description: 'Has cute little paws.', caught: true, rarity: 'rare' },
  rat021: { name: 'Scurry', description: 'Loves tight spaces.', caught: true, rarity: 'rare' },
  rat022: { name: 'Twitch', description: 'Always alert.', caught: false, rarity: 'rare' },
  rat023: { name: 'Pebble', description: 'Hard-headed and loyal.', caught: true, rarity: 'rare' },
  rat024: { name: 'Flick', description: 'Quick reflexes.', caught: false, rarity: 'rare' },
  rat025: { name: 'Clover', description: 'Said to bring luck.', caught: false, rarity: 'rare' },

  rat026: { name: 'Truffle', description: 'Expert at finding food.', caught: true, rarity: 'super rare' },
  rat027: { name: 'Glimmer', description: 'Shines under moonlight.', caught: false, rarity: 'super rare' },
  rat028: { name: 'Snip', description: 'Sharp and sneaky.', caught: true, rarity: 'super rare' },
  rat029: { name: 'Spindle', description: 'Thin and wiry.', caught: false, rarity: 'super rare' },

  rat030: { name: 'Specter', description: 'Seen only in reflections.', caught: false, rarity: 'secret rare' }
}

const rarities = [
  { value: 'common', label: 'Common' },
  { value: 'rare', label: 'Rare' },
  { value: 'super rare', label: 'Super Rare' },
  { value: 'secret rare', label: 'Secret Rare' },
]

export {rarities, ratdexData}