/* =========================================================================
   3) DATASET DE QUESTIONS (réponse libre à taper)
   Chaque jeu de questions est associé à un indicateur (k1, k2, k3, k4).
   "condition" est comparée à indicatorScore = kiValue + 1 :
     - ki = 0 → indicatorScore = 1 → question de condition 1
     - ki = 1 → indicatorScore = 2 → question de condition 2
   La question retenue est celle dont la condition est la plus haute
   tout en restant <= indicatorScore.
   =========================================================================  */
const QUESTION_SETS = {
  RubiqueQ1: [
    {
      condition: 1,
      question: {
        fr: "<span style='font-size:2em'>Combien font 3 × 5 ?</span>\n 🖐️ Indice : compte 5 doigts, puis encore 5, puis encore 5 !",
        en: "<span style='font-size:2em'>How much is 3 × 5?</span>\n 🖐️ Hint: count 5 fingers, then 5 more, then 5 more!"
      },
      answer: {
        fr: "15",
        en: "15"
      }
    },
    {
      condition: 2,
      question: {
        fr: "<span style='font-size:2em'>Combien font 4 × 4 ?</span>\n 🧩 Indice : imagine un carré de 4 cases sur 4 cases.",
        en: "<span style='font-size:2em'>How much is 4 × 4?</span>\n 🧩 Hint: imagine a square with 4 rows of 4 squares."
      },
      answer: {
        fr: "16",
        en: "16"
      }
    },
    {
      condition: 3,
      question: {
        fr: "<span style='font-size:2em'>Combien font 7 × 2 ?</span>\n 👯 Indice : deux fois 7, c'est comme avoir deux équipes de 7 joueurs.",
        en: "<span style='font-size:2em'>How much is 7 × 2?</span>\n 👯 Hint: twice 7 is like having two teams of 7 players."
      },
      answer: {
        fr: "14",
        en: "14"
      }
    },
    {
      condition: 4,
      question: {
        fr: "<span style='font-size:2em'>Combien font 6 × 5 ?</span>\n ✋ Indice : la table de 5 adore les nombres qui finissent par 0 ou 5.",
        en: "<span style='font-size:2em'>How much is 6 × 5?</span>\n ✋ Hint: the 5 times table loves numbers ending in 0 or 5."
      },
      answer: {
        fr: "30",
        en: "30"
      }
    },
    {
      condition: 5,
      question: {
        fr: "<span style='font-size:2em'>Combien font 8 × 3 ?</span>\n 🐙 Indice : un poulpe a 8 tentacules. Combien de tentacules pour 3 poulpes ?",
        en: "<span style='font-size:2em'>How much is 8 × 3?</span>\n 🐙 Hint: an octopus has 8 tentacles. How many tentacles do 3 octopuses have?"
      },
      answer: {
        fr: "24",
        en: "24"
      }
    },
    {
      condition: 6,
      question: {
        fr: "<span style='font-size:2em'>Combien font 9 × 2 ?</span>\n 🚀 Indice : compte 9, puis ajoute encore 9.",
        en: "<span style='font-size:2em'>How much is 9 × 2?</span>\n 🚀 Hint: count 9, then add another 9."
      },
      answer: {
        fr: "18",
        en: "18"
      }
    },
    {
      condition: 7,
      question: {
        fr: "<span style='font-size:2em'>Combien font 7 × 3 ?</span>\n 🎯 Indice : 7 + 7 = 14. Ajoute encore 7 !",
        en: "<span style='font-size:2em'>How much is 7 × 3?</span>\n 🎯 Hint: 7 + 7 = 14. Add another 7!"
      },
      answer: {
        fr: "21",
        en: "21"
      }
    },
    {
      condition: 8,
      question: {
        fr: "<span style='font-size:2em'>Combien font 9 × 3 ?</span>\n 🧠 Indice : 3 × 10 = 30. Retire simplement 3 !",
        en: "<span style='font-size:2em'>How much is 9 × 3?</span>\n 🧠 Hint: 3 × 10 = 30. Simply take away 3!"
      },
      answer: {
        fr: "27",
        en: "27"
      }
    },
    {
      condition: 9,
      question: {
        fr: "<span style='font-size:2em'>Combien font 4 × 6 ?</span>\n 🎲 Indice : imagine 4 dés avec 6 faces chacun. Combien de faces au total ?",
        en: "<span style='font-size:2em'>How much is 4 × 6?</span>\n 🎲 Hint: imagine 4 dice with 6 faces each. How many faces altogether?"
      },
      answer: {
        fr: "24",
        en: "24"
      }
    },
    {
      condition: 10,
      question: {
        fr: "<span style='font-size:2em'>Combien font 8 × 4 ?</span>\n 🕵️ Indice : double 8 pour obtenir 16, puis double encore !",
        en: "<span style='font-size:2em'>How much is 8 × 4?</span>\n 🕵️ Hint: double 8 to get 16, then double it again!"
      },
      answer: {
        fr: "32",
        en: "32"
      }
    },
    {
      condition: 11,
      question: {
        fr: "<span style='font-size:2em'>Combien font 5 × 7 ?</span>\n ⭐ Indice : dans la table de 5, le résultat finit par 0 ou 5.",
        en: "<span style='font-size:2em'>How much is 5 × 7?</span>\n ⭐ Hint: in the 5 times table, the answer ends in 0 or 5."
      },
      answer: {
        fr: "35",
        en: "35"
      }
    },
    {
      condition: 12,
      question: {
        fr: "<span style='font-size:2em'>Combien font 6 × 4 ?</span>\n 🧱 Indice : imagine 6 rangées de 4 briques.",
        en: "<span style='font-size:2em'>How much is 6 × 4?</span>\n 🧱 Hint: imagine 6 rows of 4 bricks."
      },
      answer: {
        fr: "24",
        en: "24"
      }
    },
    {
      condition: 13,
      question: {
        fr: "<span style='font-size:2em'>Combien font 7 × 5 ?</span>\n 🖐️ Indice : cinq groupes de 7… ou sept groupes de 5 !",
        en: "<span style='font-size:2em'>How much is 7 × 5?</span>\n 🖐️ Hint: five groups of 7... or seven groups of 5!"
      },
      answer: {
        fr: "35",
        en: "35"
      }
    },
    {
      condition: 14,
      question: {
        fr: "<span style='font-size:2em'>Combien font 9 × 4 ?</span>\n 🧙 Indice : 10 × 4 = 40. Retire une fois 4.",
        en: "<span style='font-size:2em'>How much is 9 × 4?</span>\n 🧙 Hint: 10 × 4 = 40. Take away one group of 4."
      },
      answer: {
        fr: "36",
        en: "36"
      }
    },
    {
      condition: 15,
      question: {
        fr: "<span style='font-size:2em'>Combien font 6 × 6 ?</span>\n 🪄 Indice : six groupes de six. C'est un carré magique !",
        en: "<span style='font-size:2em'>How much is 6 × 6?</span>\n 🪄 Hint: six groups of six. It's a magic square!"
      },
      answer: {
        fr: "36",
        en: "36"
      }
    },
    {
      condition: 16,
      question: {
        fr: "<span style='font-size:2em'>Combien font 8 × 5 ?</span>\n 🚂 Indice : compte de 5 en 5 : 5, 10, 15, 20, 25, 30, 35, ...",
        en: "<span style='font-size:2em'>How much is 8 × 5?</span>\n 🚂 Hint: count by 5s: 5, 10, 15, 20, 25, 30, 35, ..."
      },
      answer: {
        fr: "40",
        en: "40"
      }
    },
    {
      condition: 17,
      question: {
        fr: "<span style='font-size:2em'>Combien font 7 × 4 ?</span>\n 🧮 Indice : 7 + 7 + 7 + 7. Additionne les quatre 7 !",
        en: "<span style='font-size:2em'>How much is 7 × 4?</span>\n 🧮 Hint: 7 + 7 + 7 + 7. Add the four 7s!"
      },
      answer: {
        fr: "28",
        en: "28"
      }
    },
    {
      condition: 18,
      question: {
        fr: "<span style='font-size:2em'>Combien font 9 × 5 ?</span>\n 🖐️ Indice : 10 × 5 = 50. Enlève une main de 5 !",
        en: "<span style='font-size:2em'>How much is 9 × 5?</span>\n 🖐️ Hint: 10 × 5 = 50. Take away one group of 5!"
      },
      answer: {
        fr: "45",
        en: "45"
      }
    },
    {
      condition: 19,
      question: {
        fr: "<span style='font-size:2em'>Combien font 8 × 6 ?</span>\n 🎮 Indice : double 8 = 16, puis double 16 = 32, puis ajoute encore 16.",
        en: "<span style='font-size:2em'>How much is 8 × 6?</span>\n 🎮 Hint: double 8 = 16, then double 16 = 32, then add another 16."
      },
      answer: {
        fr: "48",
        en: "48"
      }
    },
    {
      condition: 20,
      question: {
        fr: "<span style='font-size:2em'>Combien font 7 × 6 ?</span>\n 🏆 Indice : 7 × 5 = 35. Ajoute encore un groupe de 7 !",
        en: "<span style='font-size:2em'>How much is 7 × 6?</span>\n 🏆 Hint: 7 × 5 = 35. Add one more group of 7!"
      },
      answer: {
        fr: "42",
        en: "42"
      }
    }
  ],

/* =========================================================================Rubrique Q2 Les items*/
  RubiqueQ2: [
    {
      condition: 1,
      question: {
        fr: "Pour prendre cet objet, tu dois savoir répondre à cette question\n<span style='font-size:2em'>Combien font 5 × 3 ?</span>\n🧙‍♂️ Indice : la table de 5 est magique : elle finit toujours par 0 ou 5 !",
        en: "To take this object, you must know how to answer this question\n<span style='font-size:2em'>How much is 5 × 3?</span>\n🧙‍♂️ Hint: the 5 times table is magical: it always ends in 0 or 5!"
      },
      answer: {
        fr: "15",
        en: "15"
      }
    },

    {
      condition: 2,
      question: {
        fr: "<span style='font-size:2em'>Combien font 2 × 6 ?</span>\n🐉 Indice : deux dragons de 6 têtes chacun... ça fait combien de têtes ?",
        en: "<span style='font-size:2em'>How much is 2 × 6?</span>\n🐉 Hint: two dragons with 6 heads each... how many heads is that?"
      },
      answer: {
        fr: "12",
        en: "12"
      }
    },

    {
      condition: 3,
      question: {
        fr: "<span style='font-size:2em'>Combien font 4 × 4 ?</span>\n🏰 Indice : imagine un château avec 4 tours et 4 drapeaux sur chaque tour.",
        en: "<span style='font-size:2em'>How much is 4 × 4?</span>\n🏰 Hint: imagine a castle with 4 towers and 4 flags on each tower."
      },
      answer: {
        fr: "16",
        en: "16"
      }
    },

    {
      condition: 4,
      question: {
        fr: "<span style='font-size:2em'>Combien font 4 × 5 ?</span>\n🖐️ Indice : multiplier par 5 donne toujours un résultat qui se termine par 0 ou 5.",
        en: "<span style='font-size:2em'>How much is 4 × 5?</span>\n🖐️ Hint: multiplying by 5 always gives a result ending in 0 or 5."
      },
      answer: {
        fr: "20",
        en: "20"
      }
    },

    {
      condition: 5,
      question: {
        fr: "<span style='font-size:2em'>Combien font 6 × 3 ?</span>\n🔢 Indice : cherche un nombre qui est pair et dont les chiffres additionnés donnent 9.",
        en: "<span style='font-size:2em'>How much is 6 × 3?</span>\n🔢 Hint: look for an even number whose digits add up to 9."
      },
      answer: {
        fr: "18",
        en: "18"
      }
    },

    {
      condition: 6,
      question: {
        fr: "<span style='font-size:2em'>Combien font 7 × 2 ?</span>\n👯 Indice : double 7. Deux fois le même nombre, c'est une paire !",
        en: "<span style='font-size:2em'>How much is 7 × 2?</span>\n👯 Hint: double 7. Two times the same number makes a pair!"
      },
      answer: {
        fr: "14",
        en: "14"
      }
    },

    {
      condition: 7,
      question: {
        fr: "<span style='font-size:2em'>Combien font 3 × 7 ?</span>\n🎯 Indice : compte 7, puis encore 7, puis encore 7.",
        en: "<span style='font-size:2em'>How much is 3 × 7?</span>\n🎯 Hint: count 7, then another 7, then another 7."
      },
      answer: {
        fr: "21",
        en: "21"
      }
    },

    {
      condition: 8,
      question: {
        fr: "<span style='font-size:2em'>Combien font 8 × 3 ?</span>\n🐙 Indice : un poulpe possède 8 tentacules. Combien pour 3 poulpes ?",
        en: "<span style='font-size:2em'>How much is 8 × 3?</span>\n🐙 Hint: an octopus has 8 tentacles. How many for 3 octopuses?"
      },
      answer: {
        fr: "24",
        en: "24"
      }
    },

    {
      condition: 9,
      question: {
        fr: "<span style='font-size:2em'>Combien font 9 × 2 ?</span>\n🚀 Indice : pars de 10 × 2 = 20 et enlève 2.",
        en: "<span style='font-size:2em'>How much is 9 × 2?</span>\n🚀 Hint: start with 10 × 2 = 20 and take away 2."
      },
      answer: {
        fr: "18",
        en: "18"
      }
    },

    {
      condition: 10,
      question: {
        fr: "<span style='font-size:2em'>Combien font 5 × 6 ?</span>\n⭐ Indice : compte de 5 en 5 jusqu'à six groupes.",
        en: "<span style='font-size:2em'>How much is 5 × 6?</span>\n⭐ Hint: count by 5s until you reach six groups."
      },
      answer: {
        fr: "30",
        en: "30"
      }
    },

    {
      condition: 11,
      question: {
        fr: "<span style='font-size:2em'>Combien font 4 × 6 ?</span>\n🎲 Indice : quatre dés ont chacun 6 faces. Combien de faces au total ?",
        en: "<span style='font-size:2em'>How much is 4 × 6?</span>\n🎲 Hint: four dice each have 6 faces. How many faces altogether?"
      },
      answer: {
        fr: "24",
        en: "24"
      }
    },

    {
      condition: 12,
      question: {
        fr: "<span style='font-size:2em'>Combien font 7 × 5 ?</span>\n🖐️ Indice : 5 + 5 + 5 + 5 + 5 + 5 + 5... compte les sept 5 !",
        en: "<span style='font-size:2em'>How much is 7 × 5?</span>\n🖐️ Hint: 5 + 5 + 5 + 5 + 5 + 5 + 5... count the seven 5s!"
      },
      answer: {
        fr: "35",
        en: "35"
      }
    },

    {
      condition: 13,
      question: {
        fr: "<span style='font-size:2em'>Combien font 8 × 4 ?</span>\n🧠 Indice : double 8 = 16. Double encore 16 !",
        en: "<span style='font-size:2em'>How much is 8 × 4?</span>\n🧠 Hint: double 8 = 16. Double 16 again!"
      },
      answer: {
        fr: "32",
        en: "32"
      }
    },

    {
      condition: 14,
      question: {
        fr: "<span style='font-size:2em'>Combien font 9 × 4 ?</span>\n🪄 Indice : 10 × 4 = 40. Retire un groupe de 4.",
        en: "<span style='font-size:2em'>How much is 9 × 4?</span>\n🪄 Hint: 10 × 4 = 40. Take away one group of 4."
      },
      answer: {
        fr: "36",
        en: "36"
      }
    },

    {
      condition: 15,
      question: {
        fr: "<span style='font-size:2em'>Combien font 6 × 6 ?</span>\n🔲 Indice : imagine un carré avec 6 rangées de 6 cases.",
        en: "<span style='font-size:2em'>How much is 6 × 6?</span>\n🔲 Hint: imagine a square with 6 rows of 6 squares."
      },
      answer: {
        fr: "36",
        en: "36"
      }
    },

    {
      condition: 16,
      question: {
        fr: "<span style='font-size:2em'>Combien font 8 × 5 ?</span>\n🎵 Indice : 5, 10, 15, 20, 25, 30, 35... quel est le nombre suivant ?",
        en: "<span style='font-size:2em'>How much is 8 × 5?</span>\n🎵 Hint: 5, 10, 15, 20, 25, 30, 35... what comes next?"
      },
      answer: {
        fr: "40",
        en: "40"
      }
    },

    {
      condition: 17,
      question: {
        fr: "<span style='font-size:2em'>Combien font 7 × 4 ?</span>\n🧮 Indice : additionne 7 quatre fois : 7 + 7 + 7 + 7.",
        en: "<span style='font-size:2em'>How much is 7 × 4?</span>\n🧮 Hint: add 7 four times: 7 + 7 + 7 + 7."
      },
      answer: {
        fr: "28",
        en: "28"
      }
    },

    {
      condition: 18,
      question: {
        fr: "<span style='font-size:2em'>Combien font 9 × 5 ?</span>\n🧙 Indice : 10 × 5 = 50. Enlève un groupe de 5.",
        en: "<span style='font-size:2em'>How much is 9 × 5?</span>\n🧙 Hint: 10 × 5 = 50. Take away one group of 5."
      },
      answer: {
        fr: "45",
        en: "45"
      }
    },

    {
      condition: 19,
      question: {
        fr: "<span style='font-size:2em'>Combien font 8 × 6 ?</span>\n⚔️ Indice : 8 × 5 = 40. Ajoute encore 8 !",
        en: "<span style='font-size:2em'>How much is 8 × 6?</span>\n⚔️ Hint: 8 × 5 = 40. Add another 8!"
      },
      answer: {
        fr: "48",
        en: "48"
      }
    },

    {
      condition: 20,
      question: {
        fr: "<span style='font-size:2em'>Combien font 7 × 6 ?</span>\n🏆 Indice : 7 × 5 = 35. Ajoute encore 7 pour atteindre le trésor !",
        en: "<span style='font-size:2em'>How much is 7 × 6?</span>\n🏆 Hint: 7 × 5 = 35. Add another 7 to reach the treasure!"
      },
      answer: {
        fr: "42",
        en: "42"
      }
    }
  ],



/* =========================================================================Rubrique Q3*/


  RubiqueQ3: [
   {
    condition: 1,
    question: {
        fr: "<span style='font-size:2em'>Combien font (7 × 6) + 3 ?</span>\n🧩 Indice : Imagine 6 groupes de 7. Compte-les, puis ajoute les 3 pièces trouvées dans le coffre.",
        en: "<span style='font-size:2em'>How much is (7 × 6) + 3?</span>\n🧩 Hint: Imagine 6 groups of 7. Count them, then add the 3 coins found in the chest."
    },
    answer: {
        fr: "45",
        en: "45"
    }
},

{
    condition: 2,
    question: {
        fr: "<span style='font-size:2em'>Combien font (8 × 5) + 4 ?</span>\n🔐 Indice : Trouve d'abord le nombre de doigts de 5 mains, mais avec 8 groupes. Le coffre cache ensuite 4 pièces supplémentaires.",
        en: "<span style='font-size:2em'>How much is (8 × 5) + 4?</span>\n🔐 Hint: First find the number of fingers on 5 hands, but with 8 groups. Then add the 4 extra coins."
    },
    answer: {
        fr: "44",
        en: "44"
    }
},

{
    condition: 3,
    question: {
        fr: "<span style='font-size:2em'>Combien font (6 × 7) - 5 ?</span>\n🧙 Indice : Construis 7 groupes de 6. Une fois ton total trouvé, le magicien te demande de lui rendre 5 étoiles.",
        en: "<span style='font-size:2em'>How much is (6 × 7) - 5?</span>\n🧙 Hint: Build 7 groups of 6. Once you have your total, the wizard asks you to give back 5 stars."
    },
    answer: {
        fr: "37",
        en: "37"
    }
},

{
    condition: 4,
    question: {
        fr: "<span style='font-size:2em'>Combien font (9 × 4) + 6 ?</span>\n🏰 Indice : Imagine 9 rangées contenant chacune 4 pierres. Le gardien ajoute ensuite 6 pierres à la construction.",
        en: "<span style='font-size:2em'>How much is (9 × 4) + 6?</span>\n🏰 Hint: Imagine 9 rows with 4 stones in each. The guardian then adds 6 more stones."
    },
    answer: {
        fr: "42",
        en: "42"
    }
},

{
    condition: 5,
    question: {
        fr: "<span style='font-size:2em'>Combien font (5 × 8) - 7 ?</span>\n🐉 Indice : Réunis 5 groupes de 8 flammes. Attention : le dragon en souffle 7 pour les éteindre !",
        en: "<span style='font-size:2em'>How much is (5 × 8) - 7?</span>\n🐉 Hint: Gather 5 groups of 8 flames. Careful: the dragon blows out 7 of them!"
    },
    answer: {
        fr: "33",
        en: "33"
    }
},

{
    condition: 6,
    question: {
        fr: "<span style='font-size:2em'>Combien font (7 × 8) + 2 ?</span>\n⚔️ Indice : 8 guerriers possèdent chacun 7 points de force. Trouve leur force totale, puis ajoute les 2 points du bonus.",
        en: "<span style='font-size:2em'>How much is (7 × 8) + 2?</span>\n⚔️ Hint: 8 warriors each have 7 strength points. Find their total strength, then add the 2 bonus points."
    },
    answer: {
        fr: "58",
        en: "58"
    }
},

{
    condition: 7,
    question: {
        fr: "<span style='font-size:2em'>Combien font (9 × 6) - 8 ?</span>\n🧪 Indice : Une potion contient 9 rangées de 6 gouttes. Le guérisseur utilise 8 gouttes pour soigner le héros.",
        en: "<span style='font-size:2em'>How much is (9 × 6) - 8?</span>\n🧪 Hint: A potion contains 9 rows of 6 drops. The healer uses 8 drops to heal the hero."
    },
    answer: {
        fr: "46",
        en: "46"
    }
},

{
    condition: 8,
    question: {
        fr: "<span style='font-size:2em'>Combien font (6 × 8) + 5 ?</span>\n🧱 Indice : Construis 6 murs identiques de 8 pierres. Puis trouve 5 pierres cachées derrière la porte.",
        en: "<span style='font-size:2em'>How much is (6 × 8) + 5?</span>\n🧱 Hint: Build 6 identical walls using 8 stones each. Then find 5 stones hidden behind the door."
    },
    answer: {
        fr: "53",
        en: "53"
    }
},

{
    condition: 9,
    question: {
        fr: "<span style='font-size:2em'>Combien font (8 × 7) - 9 ?</span>\n🌟 Indice : Imagine 8 constellations de 7 étoiles. Une tempête magique fait disparaître 9 étoiles.",
        en: "<span style='font-size:2em'>How much is (8 × 7) - 9?</span>\n🌟 Hint: Imagine 8 constellations with 7 stars each. A magical storm makes 9 stars disappear."
    },
    answer: {
        fr: "47",
        en: "47"
    }
},

{
    condition: 10,
    question: {
        fr: "<span style='font-size:2em'>Combien font (9 × 7) + 4 ?</span>\n🔮 Indice : Pour simplifier, pense à 10 groupes de 7, puis enlève un groupe. Le cristal ajoute ensuite 4 pouvoirs.",
        en: "<span style='font-size:2em'>How much is (9 × 7) + 4?</span>\n🔮 Hint: To make it easier, think of 10 groups of 7, then remove one group. The crystal then adds 4 powers."
    },
    answer: {
        fr: "67",
        en: "67"
    }
},

{
    condition: 11,
    question: {
        fr: "<span style='font-size:2em'>Combien font (8 × 9) - 6 ?</span>\n🐲 Indice : Pour calculer 8 × 9, imagine 8 groupes de 10, puis retire 8 pour chaque groupe. Ensuite, le dragon prend encore 6 points.",
        en: "<span style='font-size:2em'>How much is (8 × 9) - 6?</span>\n🐲 Hint: To calculate 8 × 9, imagine 8 groups of 10, then remove 8 from each group. Then the dragon takes another 6 points."
    },
    answer: {
        fr: "66",
        en: "66"
    }
},

{
    condition: 12,
    question: {
        fr: "<span style='font-size:2em'>Combien font (7 × 9) + 8 ?</span>\n🚪 Indice : Multiplier par 9 peut être plus facile en multipliant par 10 puis en retirant un groupe. Le portail réclame ensuite 8 clés.",
        en: "<span style='font-size:2em'>How much is (7 × 9) + 8?</span>\n🚪 Hint: Multiplying by 9 can be easier if you multiply by 10 and remove one group. The gate then requires 8 keys."
    },
    answer: {
        fr: "71",
        en: "71"
    }
},

{
    condition: 13,
    question: {
        fr: "<span style='font-size:2em'>Combien font (9 × 8) - 7 ?</span>\n💰 Indice : Ne cherche pas directement 9 × 8. Imagine plutôt 10 groupes de 8, puis retire un groupe entier. Enfin, dépense 7 pièces.",
        en: "<span style='font-size:2em'>How much is (9 × 8) - 7?</span>\n💰 Hint: Don't calculate 9 × 8 directly. Imagine 10 groups of 8, then remove one complete group. Finally, spend 7 coins."
    },
    answer: {
        fr: "65",
        en: "65"
    }
},

{
    condition: 14,
    question: {
        fr: "<span style='font-size:2em'>Combien font (6 × 9) + 7 ?</span>\n🌋 Indice : 9 groupes de 6 peuvent être vus comme 10 groupes de 6 auxquels il manque un groupe. Le volcan ajoute ensuite 7 flammes.",
        en: "<span style='font-size:2em'>How much is (6 × 9) + 7?</span>\n🌋 Hint: 9 groups of 6 can be seen as 10 groups of 6 with one group missing. The volcano then adds 7 flames."
    },
    answer: {
        fr: "61",
        en: "61"
    }
},

{
    condition: 15,
    question: {
        fr: "<span style='font-size:2em'>Combien font (8 × 8) - 5 ?</span>\n🧩 Indice : Imagine un carré de 8 cases sur 8. Combien de cases contient-il ? Maintenant, cinq cases deviennent invisibles.",
        en: "<span style='font-size:2em'>How much is (8 × 8) - 5?</span>\n🧩 Hint: Imagine a square with 8 rows and 8 columns. How many squares does it contain? Now five become invisible."
    },
    answer: {
        fr: "59",
        en: "59"
    }
},

{
    condition: 16,
    question: {
        fr: "<span style='font-size:2em'>Combien font (9 × 9) + 3 ?</span>\n👑 Indice : Un carré magique possède 9 rangées de 9 cases. Trouve son nombre total de cases, puis ajoute les 3 couronnes du roi.",
        en: "<span style='font-size:2em'>How much is (9 × 9) + 3?</span>\n👑 Hint: A magic square has 9 rows of 9 squares. Find the total number of squares, then add the king's 3 crowns."
    },
    answer: {
        fr: "84",
        en: "84"
    }
},

{
    condition: 17,
    question: {
        fr: "<span style='font-size:2em'>Combien font (7 × 8) - 4 ?</span>\n🧙‍♂️ Indice : Retourne le problème : imagine 8 groupes de 7. Trouve le total, puis laisse le sage retirer 4 points de magie.",
        en: "<span style='font-size:2em'>How much is (7 × 8) - 4?</span>\n🧙‍♂️ Hint: Reverse the problem: imagine 8 groups of 7. Find the total, then let the wizard remove 4 magic points."
    },
    answer: {
        fr: "52",
        en: "52"
    }
},

{
    condition: 18,
    question: {
        fr: "<span style='font-size:2em'>Combien font (9 × 7) - 5 ?</span>\n🗡️ Indice : Astuce du héros : 9 groupes peuvent être transformés en 10 groupes moins un. Utilise cette ruse avant de retirer les 5 points.",
        en: "<span style='font-size:2em'>How much is (9 × 7) - 5?</span>\n🗡️ Hint: Hero's trick: 9 groups can become 10 groups minus one. Use this trick before removing the 5 points."
    },
    answer: {
        fr: "58",
        en: "58"
    }
},

{
    condition: 19,
    question: {
        fr: "<span style='font-size:2em'>Combien font (8 × 9) + 7 ?</span>\n⚡ Indice : Pour éviter la table de 9, transforme 9 en 10 - 1. Calcule astucieusement, puis laisse tomber les 7 éclairs bonus.",
        en: "<span style='font-size:2em'>How much is (8 × 9) + 7?</span>\n⚡ Hint: To avoid the 9 times table, turn 9 into 10 - 1. Calculate cleverly, then add the 7 bonus lightning bolts."
    },
    answer: {
        fr: "79",
        en: "79"
    }
},

{
    condition: 20,
    question: {
        fr: "<span style='font-size:2em'>Combien font (9 × 9) - 8 ?</span>\n🏆 Indice : Le dernier défi ! Imagine 10 groupes de 9, retire un groupe, puis soustrais encore 8. Le trésor est proche…",
        en: "<span style='font-size:2em'>How much is (9 × 9) - 8?</span>\n🏆 Hint: The final challenge! Imagine 10 groups of 9, remove one group, then subtract 8 more. The treasure is close..."
    },
    answer: {
        fr: "73",
        en: "73"
      }
    }
  ],
/* =========================================================================Rubrique Q4*/
  RubiqueQ4: [
    {
      condition: 1,
      question: {
        fr: "Quelle est la capitale de la France ?",
        en: "What is the capital of France?"
      },
      answer: {
        fr: "Paris",
        en: "Paris"
      }
    },
    {
      condition: 2,
      question: {
        fr: "Quelle est la capitale de l'Allemagne ?",
        en: "What is the capital of Germany?"
      },
      answer: {
        fr: "Berlin",
        en: "Berlin"
      }
    }
  ],
/* =========================================================================divers*/
  latrines: [
    {
      condition: 1,
      question: {
        fr: "Hé, t'es sur de vouloir visiter les latrines du village ?",
        en: "Hey, are you sure you want to visit the village latrines?"
      },
      answer: {
        fr: "non",
        en: "non"
      }
    }
  ],

  chateau: [
    {
      condition: 1,
      question: {
        fr: "Ce chemin te mêne au chateau. Attention aux gardes! Ils ne laissent pas passer tout le monde.",
        en: "This path leads you to the castle. Watch out for the guards! They do not let everyone pass."
      },
      answer: {
        fr: "non",
        en: "non"
      }
    }
  ],

  GARDE: [
    {
      condition: 1,
      question: {
        fr: "Avez vous le mot de passe donné par les gardes ?",
        en: "Do you have the password given by the guards?"
      },
      answer: {
        fr: "23",
        en: "23"
      }
    }
  ],
/* =========================================================================Divers Q2*/
  MENHIR: [
    {
      condition: 1,
      question: {
        fr: "Quel est la plante sacrée ?",
        en: "What is the sacred plant?"
      },
      answer: {
        fr: "sauge",
        en: "sage"
      }
    }
  ],
/* =========================================================================Enigme*/
  ENIGME: [
    {
      condition: 1,
      question: {
        fr: "🧠 Oh il s'agit d'une enigme. J'adore ! Il est dit que tu dois absolument la résoudre pour passer aux autres. 'Je coule d'un bec de fontaine, je suis claire comme le cristal, sans goût ni odeur. On me verse dans le mortier pour préparer les potions. Qui suis-je' ?",
        en: "🧠 Oh, this is a riddle. I love it! It says you must solve it to move on. 'I flow from a fountain spout, I am clear as crystal, tasteless and odorless. I am poured into the mortar to prepare potions. What am I?'"
      },
      answer: {
        fr: "eau",
        en: "water"
      }
    },
    {
      condition: 2,
      question: {
        fr: "Super, on arrive à la seconde enigme :'Je suis né du vin, mais je ne suis plus bon à boire. Mon goût est devenu aigre et piquant, et je suis souvent conservé dans une bouteille. Qui suis-je ?'",
        en: "Great, here is the second riddle: 'I was born from wine, but I am no longer good to drink. My taste has become sour and sharp, and I am often kept in a bottle. What am I?'"
      },
      answer: {
        fr: "vinaigre",
        en: "vinegar"
      }
    },
    {
      condition: 3,
      question: {
        fr: "Je suis le nom d'un arbre, mais mon nom ressemble à celui d'un homme … sage et Lily m'aime bien et fait de jolie bouquet avec mes fleurs. Trouve mon nom et crie-le devant le bec de la fontaine pour découvrir mon secret. Qui suis-je ?",
        en: "I am the name of a tree, but my name looks like that of a... wise man in french and in formal english, and Lily likes me and makes pretty bouquets with my flowers. Find my name and shout it in front of the fountain spout to discover my secret. Who am I?"
      },
      answer: {
        fr: "sauge",
        en: "sage"
      }
    },
  {
      condition: 4,
      question: {
        fr: "Tu as répondu à toutes les enigmes, va à la fontaine maintenant",
        en: "Now that you have answered all the riddles, go to the fountain."
      },
      answer: {
        fr: "sauge",
        en: "sage"
      }
    }
  ]
};

/* =========================================================================QUIZ*/
const QUIZ_SETS = {
  QUIZ1: [

 {
      condition: 1,
      question: {
        fr: "Comment appelle-t-on aussi les nombres de la table de 2 ?",
        en: "What are the numbers in the 2 times table also called?"
      },
      answers: [
        {
          fr: "Les nombres pairs",
          en: "The Even numbers"
        },
        {
          fr: "Les nombres impairs",
          en: "The Odd numbers"
        },
        {
          fr: "Les nombres déplaires",
          en: "The Oddables"
        },
        {
          fr: "Les nombres pépéres",
          en: "The Pairy-fairs"
        },
        {
          fr: "Ils n'ont pas de nom",
          en: "They've got no name"
        }
      ]
    },


    {
      condition: 5,
      question: {
        fr: "Le nombre 72 est obtenu par la multiplication de ...",
        en: "The number 72 is obtained by multiplying..."
      },
      answers: [
        {
          fr: "9x8",
          en: "9x8"
        },
        {
          fr: "8x7",
          en: "8x7"
        },
        {
          fr: "9x7",
          en: "9x7"
        },
        {
          fr: "6x10",
          en: "6x10"
        },
        {
          fr: "8x8",
          en: "8x8"
        }
      ]
    },
    {
      condition: 2,
      question: {
        fr: "Le nombre 48 est obtenu par la multiplication de ...",
        en: "The number 48 is obtained by multiplying..."
      },
      answers: [
        {
          fr: "6x8",
          en: "8x6"
        },
        {
          fr: "5x8",
          en: "8x5"
        },
        {
          fr: "6*9",
          en: "9x6"
        },
        {
          fr: "4x8",
          en: "8x4"
        },
        {
          fr: "6x7",
          en: "7x8"
        }
      ]
    },
    {
      condition: 3,
      question: {
        fr: "L'expression (2x6)+(3x2) nous donne ...",
        en: "The expression (2x6)+(3x2) gives us..."
      },
      answers: [
        {
          fr: "18",
          en: "18"
        },
        {
          fr: "20",
          en: "20"
        },
        {
          fr: "16",
          en: "16"
        },
        {
          fr: "22",
          en: "22"
        },
        {
          fr: "24",
          en: "24"
        }
      ]
    },
    {
      condition: 4,
      question: {
        fr: "Quelle est la particularité des mulplications par le nombre 3 ?",
        en: "What makes multiplying by the number three special?"
      },
      answers: [
        {
          fr: " Dans la table de 3, la somme des chiffres du résultat est toujours un multiple de 3",
          en: "The sum of the digits in the result of any multiplication by 3 is always a multiple of 3."
        },
        {
          fr: "Cela donne toujours un nombre pair",
          en: "This always results in an even number."
        },
        {
          fr: "Le résultat fini toujours par 3 ",
          en: "The result always ends in either a 3."
        },
        {
          fr: "Le chiffre obtenu est aussi un multiple de 5",
          en: "The resulting number is also a multiple of 5."
        },
        {
          fr: "Ils n'ont rien de special",
          en: "They have nothing special about them."
        }
      ]
    },
    {
      condition: 6,
      question: {
        fr: "Comment appelle-t-on aussi les nombres de la table de 2 ?",
        en: "What are the numbers in the 2 times table also called?"
      },
      answers: [
        {
          fr: "Les nombres pairs",
          en: "The Even numbers"
        },
        {
          fr: "Les nombres impairs",
          en: "The Odd numbers"
        },
        {
          fr: "Les nombres déplaires",
          en: "The Oddables"
        },
        {
          fr: "Les nombres pépéres",
          en: "The Pairy-fairs"
        },
        {
          fr: "Ils n'ont pas de nom",
          en: "They've got no name"
        }
      ]
    }
  ]
};

/* Map chaque setId (question OU quiz) vers l'indicateur correspondant (k1, k2, k3, k4...). */
const SET_TO_INDICATOR = {
    RubiqueQ1: 		"k1",
    RubiqueQ2: 		"k2",
    RubiqueQ3:  	"k3",
    RubiqueQ4:     	"k4",
    ENIGME:	   	"kenigme",
    QUIZ1:		"kquiz",

};
