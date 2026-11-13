/*!
 * help.js — Manuel utilisateur multilingue de BRIDGE
 * Ce fichier contient les données d'aide utilisées par BridgeChatbot.js.
 */

window.BRIDGE_HELP = {
  defaultLang: 'fr',

  /**
   * Vocabulaire des boutons (tel qu'il apparaît dans le lecteur) :
   *   ☰ Menu · Chapitre · Lecture/Pause · Sous-titres · ⚙ Accessibilité ·
   *   📄 Transcription · 🔊/🔇 · ♻️ Reset · ShapeMate™ · 💬 (assistant)
   */
  entries: [

    /* =====================================================================
       DÉCOUVRIR BRIDGE
       ===================================================================== */
    {
      id: 'use_assistant',

      title: {
        fr: "Qu'est-ce que BRIDGE ?",
        en: "What is BRIDGE?"
      },

      questions: {
        fr: [
          "Qu'est-ce que BRIDGE ?",
          "À quoi sert BRIDGE ?",
          "BRIDGE, c'est quoi ?",
          "Présentation de BRIDGE"
        ],
        en: [
          "What is BRIDGE?",
          "What is BRIDGE for?",
          "Tell me about BRIDGE",
          "BRIDGE overview"
        ]
      },

      answer: {
        fr: {
          text: "BRIDGE (Bridging Research and Inclusive Digital Education) est un lecteur de cours multilingue et accessible, conçu par SciencExpert. Il associe diapositives, voix et sous-titres synchronisés.",
          steps: [
            "Chaque chapitre se suit comme une présentation commentée.",
            "Les sous-titres, la voix et les diapositives existent en plusieurs langues.",
            "Des réglages d'accessibilité (taille des sous-titres, contraste, vitesse) s'adaptent à chacun.",
            "Un assistant permet de retrouver un passage précis du cours."
          ]
        },
        en: {
          text: "BRIDGE (Bridging Research and Inclusive Digital Education) is a multilingual, accessible course player designed by SciencExpert. It combines slides, voice and synchronised subtitles.",
          steps: [
            "Each chapter plays like a narrated presentation.",
            "Subtitles, voice and slides are available in several languages.",
            "Accessibility settings (subtitle size, contrast, speed) adapt to each learner.",
            "An assistant helps you find a specific passage of the course."
          ]
        }
      }
    },

    {
      id: 'getting_started',
      title: {
        fr: "Démarrer le cours",
        en: "Getting started"
      },
      questions: {
        fr: [
          "Comment démarrer le cours ?",
          "Comment lancer la lecture ?",
          "Par où commencer ?",
          "Comment commencer ?"
        ],
        en: [
          "How do I start the course?",
          "How do I start playback?",
          "Where do I begin?",
          "How do I get started?"
        ]
      },
      answer: {
        fr: {
          text: "Le cours démarre par un simple clic sur la lecture ; chapitre, langue et accessibilité se règlent ensuite depuis le menu.",
          steps: [
            "Cliquez sur ▶ au centre de l'image (ou sur l'image elle-même).",
            "Ouvrez ☰ Menu pour choisir le chapitre, la langue et les réglages.",
            "Utilisez la barre de progression pour avancer ou reculer.",
            "Posez une question à l'assistant 💬 si vous cherchez un point précis."
          ]
        },
        en: {
          text: "The course starts with a single click on play; chapter, language and accessibility are then set from the menu.",
          steps: [
            "Click ▶ in the middle of the image (or on the image itself).",
            "Open ☰ Menu to choose the chapter, the language and the settings.",
            "Use the progress bar to move forward or back.",
            "Ask the assistant 💬 if you are looking for a specific point."
          ]
        }
      }
    },

    {
      id: 'supported_browsers',
      title: {
        fr: "Navigateurs et appareils compatibles",
        en: "Compatible browsers and devices"
      },
      questions: {
        fr: [
          "Quel navigateur utiliser ?",
          "Est-ce que BRIDGE marche sur téléphone ?",
          "BRIDGE fonctionne-t-il sur tablette ?",
          "Quels appareils sont compatibles ?"
        ],
        en: [
          "Which browser should I use?",
          "Does BRIDGE work on a phone?",
          "Does BRIDGE work on a tablet?",
          "Which devices are supported?"
        ]
      },
      answer: {
        fr: {
          text: "BRIDGE fonctionne dans le navigateur, sans installation. Utilisez une version récente de Chrome, Edge, Firefox ou Safari, avec JavaScript activé.",
          steps: [
            "Mettez votre navigateur à jour si l'affichage ou le son posent problème.",
            "Sur téléphone ou tablette, le mode paysage rend les diapositives plus lisibles.",
            "Sur écran tactile, touchez l'image pour lancer ou mettre en pause.",
            "Les raccourcis clavier ne s'appliquent qu'avec un clavier."
          ]
        },
        en: {
          text: "BRIDGE runs in your browser, with nothing to install. Use a recent version of Chrome, Edge, Firefox or Safari with JavaScript enabled.",
          steps: [
            "Update your browser if the display or the sound cause trouble.",
            "On a phone or tablet, landscape mode makes the slides easier to read.",
            "On a touch screen, tap the image to play or pause.",
            "Keyboard shortcuts only work with a keyboard."
          ]
        }
      }
    },

    {
      id: 'internet_connection',
      title: {
        fr: "Connexion Internet",
        en: "Internet connection"
      },
      questions: {
        fr: [
          "Faut-il une connexion Internet ?",
          "Le cours se charge lentement",
          "La lecture saccade",
          "Un chapitre ne se charge pas"
        ],
        en: [
          "Do I need an Internet connection?",
          "The course loads slowly",
          "Playback is choppy",
          "A chapter does not load"
        ]
      },
      answer: {
        fr: {
          text: "Le cours est consulté en ligne : la voix, les diapositives et les sous-titres sont chargés à la demande. Une connexion stable est recommandée.",
          steps: [
            "Vérifiez votre connexion si le son ou les images tardent à apparaître.",
            "Rechargez la page avec ♻️ Reset si un chapitre ne se charge pas.",
            "Évitez de changer de chapitre ou de langue en rafale : chaque changement recharge des fichiers."
          ]
        },
        en: {
          text: "The course is viewed online: voice, slides and subtitles are loaded on demand. A stable connection is recommended.",
          steps: [
            "Check your connection if the sound or the images are slow to appear.",
            "Reload the page with ♻️ Reset if a chapter does not load.",
            "Avoid switching chapter or language repeatedly: every change reloads files."
          ]
        }
      }
    },

    {
      id: 'credits_rights',
      title: {
        fr: "Auteur, droits et contact",
        en: "Credits, rights and contact"
      },
      questions: {
        fr: [
          "Qui a créé BRIDGE ?",
          "Puis-je réutiliser ou copier le contenu ?",
          "Comment contacter SciencExpert ?",
          "Droits d'auteur du cours"
        ],
        en: [
          "Who created BRIDGE?",
          "Can I reuse or copy the content?",
          "How do I contact SciencExpert?",
          "Course copyright"
        ]
      },
      answer: {
        fr: {
          text: "BRIDGE est conçu et développé par SciencExpert. Le contenu est protégé (tous droits réservés) : toute utilisation ou reproduction non autorisée est interdite.",
          steps: [
            "Cliquez sur SciencExpert™ dans le pied de page pour accéder au site de l'éditeur.",
            "Pour réutiliser des diapositives, des sous-titres ou des extraits, demandez d'abord l'accord de SciencExpert.",
            "Pour un usage collectif (formation, établissement), contactez SciencExpert via son site."
          ]
        },
        en: {
          text: "BRIDGE is designed and developed by SciencExpert. The content is protected (all rights reserved): unauthorised use or reproduction is prohibited.",
          steps: [
            "Click SciencExpert™ in the footer to reach the publisher's website.",
            "To reuse slides, subtitles or excerpts, ask SciencExpert for permission first.",
            "For group use (training course, institution), contact SciencExpert through its website."
          ]
        }
      }
    },

    {
      id: 'report_problem',
      title: {
        fr: "Signaler un problème ou une erreur",
        en: "Reporting a problem or an error"
      },
      questions: {
        fr: [
          "Comment signaler une erreur ?",
          "J'ai trouvé une faute dans les sous-titres",
          "Il y a un bug dans le lecteur",
          "Comment contacter le support ?"
        ],
        en: [
          "How do I report an error?",
          "I found a mistake in the subtitles",
          "There is a bug in the player",
          "How do I contact support?"
        ]
      },
      answer: {
        fr: {
          text: "Pour être corrigé rapidement, un signalement doit préciser où et quand le problème apparaît.",
          steps: [
            "Notez le chapitre, la langue choisie et le minutage affiché (par exemple 03:45).",
            "Indiquez votre navigateur et votre appareil (ordinateur, tablette, téléphone).",
            "Décrivez ce que vous attendiez et ce que vous avez observé ; une capture d'écran aide.",
            "Transmettez le tout à SciencExpert via le lien du pied de page."
          ]
        },
        en: {
          text: "To be fixed quickly, a report should say where and when the problem appears.",
          steps: [
            "Note the chapter, the chosen language and the time shown (for example 03:45).",
            "Mention your browser and your device (computer, tablet, phone).",
            "Describe what you expected and what you saw; a screenshot helps.",
            "Send everything to SciencExpert through the footer link."
          ]
        }
      }
    },

    /* =====================================================================
       LECTURE
       ===================================================================== */
    {
      id: 'play_pause',
      title: {
        fr: "Lecture et pause",
        en: "Play and pause"
      },
      questions: {
        fr: [
          "Comment mettre en pause ?",
          "Comment lancer ou arrêter la lecture ?",
          "Comment reprendre la lecture ?",
          "Bouton lecture pause"
        ],
        en: [
          "How do I pause?",
          "How do I start or stop playback?",
          "How do I resume playback?",
          "Play pause button"
        ]
      },
      answer: {
        fr: {
          text: "Plusieurs gestes équivalents permettent de lancer ou d'arrêter la lecture.",
          steps: [
            "Cliquez sur ▶ / ⏸ au centre de l'image.",
            "Ou cliquez directement sur l'image de la diapositive.",
            "Ou utilisez le bouton Lecture / Pause du menu (☰ Menu).",
            "Au clavier, appuyez sur la barre d'espace."
          ]
        },
        en: {
          text: "Several equivalent gestures start or stop playback.",
          steps: [
            "Click ▶ / ⏸ in the middle of the image.",
            "Or click directly on the slide image.",
            "Or use the Play / Pause button in the menu (☰ Menu).",
            "On a keyboard, press the space bar."
          ]
        }
      }
    },

    {
      id: 'progress_bar',
      title: {
        fr: "Avancer ou reculer dans un chapitre",
        en: "Moving forward or back in a chapter"
      },
      questions: {
        fr: [
          "Comment avancer dans le chapitre ?",
          "Comment revenir en arrière ?",
          "Comment aller à un moment précis ?",
          "Barre de progression"
        ],
        en: [
          "How do I skip ahead?",
          "How do I go back?",
          "How do I jump to a specific moment?",
          "Progress bar"
        ]
      },
      answer: {
        fr: {
          text: "Vous pouvez vous déplacer dans le chapitre à la souris, au clavier ou depuis la transcription.",
          steps: [
            "Cliquez sur la barre de progression à l'endroit voulu.",
            "Appuyez sur ← ou → pour reculer ou avancer de 5 secondes.",
            "Ouvrez 📄 Transcription et cliquez sur une ligne pour aller à ce moment.",
            "Le temps écoulé et la durée totale s'affichent dans le menu (mm:ss / mm:ss)."
          ]
        },
        en: {
          text: "You can move around the chapter with the mouse, the keyboard or from the transcript.",
          steps: [
            "Click the progress bar at the position you want.",
            "Press ← or → to go back or forward by 5 seconds.",
            "Open 📄 Transcript and click a line to jump to that moment.",
            "Elapsed time and total length are shown in the menu (mm:ss / mm:ss)."
          ]
        }
      }
    },

    {
      id: 'mute_sound',
      title: {
        fr: "Couper ou rétablir le son",
        en: "Muting and unmuting"
      },
      questions: {
        fr: [
          "Comment couper le son ?",
          "Comment rétablir le son ?",
          "Bouton muet",
          "Je veux lire sans le son"
        ],
        en: [
          "How do I mute the sound?",
          "How do I unmute?",
          "Mute button",
          "I want to read without sound"
        ]
      },
      answer: {
        fr: {
          text: "Le bouton haut-parleur coupe la voix sans arrêter la lecture ni les sous-titres.",
          steps: [
            "Cliquez sur l'icône 🔊 / 🔇 en bas à droite de l'image.",
            "Ou appuyez sur la touche M du clavier.",
            "Votre choix est mémorisé pour vos prochaines visites.",
            "Pour régler le volume, utilisez le volume de votre appareil."
          ]
        },
        en: {
          text: "The speaker button silences the voice without stopping playback or subtitles.",
          steps: [
            "Click the 🔊 / 🔇 icon at the bottom right of the image.",
            "Or press the M key on your keyboard.",
            "Your choice is remembered for your next visits.",
            "To adjust the volume, use your device's volume control."
          ]
        }
      }
    },

    {
      id: 'keyboard_shortcuts',
      title: {
        fr: "Raccourcis clavier",
        en: "Keyboard shortcuts"
      },
      questions: {
        fr: [
          "Quels sont les raccourcis clavier ?",
          "Comment utiliser le clavier ?",
          "Touche espace",
          "Raccourcis"
        ],
        en: [
          "What are the keyboard shortcuts?",
          "How do I use the keyboard?",
          "Space key",
          "Shortcuts"
        ]
      },
      answer: {
        fr: {
          text: "Quatre touches pilotent le lecteur sans souris.",
          steps: [
            "Espace : lecture / pause.",
            "Flèche droite : avancer de 5 secondes.",
            "Flèche gauche : reculer de 5 secondes.",
            "M : couper ou rétablir le son.",
            "Les raccourcis sont suspendus quand vous écrivez dans un champ (par exemple l'assistant) ou utilisez une liste déroulante."
          ]
        },
        en: {
          text: "Four keys control the player without a mouse.",
          steps: [
            "Space: play / pause.",
            "Right arrow: forward 5 seconds.",
            "Left arrow: back 5 seconds.",
            "M: mute or unmute.",
            "Shortcuts are paused while you type in a field (for example the assistant) or use a drop-down list."
          ]
        }
      }
    },

    {
      id: 'playback_speed',
      title: {
        fr: "Changer la vitesse de lecture",
        en: "Changing the playback speed"
      },
      questions: {
        fr: [
          "Comment ralentir la voix ?",
          "Comment accélérer la lecture ?",
          "Vitesse de lecture",
          "Le débit est trop rapide"
        ],
        en: [
          "How do I slow down the voice?",
          "How do I speed up playback?",
          "Playback speed",
          "The pace is too fast"
        ]
      },
      answer: {
        fr: {
          text: "Cinq vitesses sont proposées, de 0,75× à 2×.",
          steps: [
            "Ouvrez ☰ Menu puis ⚙ Accessibilité.",
            "Dans « Vitesse de lecture », choisissez 0,75×, 1×, 1,25×, 1,5× ou 2×.",
            "La vitesse choisie est mémorisée pour vos prochaines visites.",
            "Pour mieux suivre, essayez 0,75× avec les sous-titres affichés."
          ]
        },
        en: {
          text: "Five speeds are available, from 0.75× to 2×.",
          steps: [
            "Open ☰ Menu, then ⚙ Accessibility.",
            "Under “Playback speed”, choose 0.75×, 1×, 1.25×, 1.5× or 2×.",
            "The chosen speed is remembered for your next visits.",
            "To follow more easily, try 0.75× with subtitles on."
          ]
        }
      }
    },

    {
      id: 'fullscreen',
      title: {
        fr: "Plein écran",
        en: "Full screen"
      },
      questions: {
        fr: [
          "Comment passer en plein écran ?",
          "Comment agrandir la diapositive ?",
          "Mode plein écran",
          "Comment afficher le cours en grand ?"
        ],
        en: [
          "How do I go full screen?",
          "How do I enlarge the slide?",
          "Full screen mode",
          "How do I display the course bigger?"
        ]
      },
      answer: {
        fr: {
          text: "Le lecteur n'a pas de bouton plein écran : utilisez celui de votre navigateur ou de votre appareil.",
          steps: [
            "Sur ordinateur, appuyez sur F11 (ou utilisez le menu du navigateur) pour passer en plein écran.",
            "Pour agrandir la page, utilisez Ctrl et + (Cmd et + sur Mac).",
            "Pour des sous-titres plus grands, choisissez « Zoom visuel » dans ⚙ Accessibilité.",
            "Sur téléphone ou tablette, tournez l'appareil en mode paysage."
          ]
        },
        en: {
          text: "The player has no full-screen button: use the one in your browser or on your device.",
          steps: [
            "On a computer, press F11 (or use the browser menu) to go full screen.",
            "To enlarge the page, use Ctrl and + (Cmd and + on a Mac).",
            "For larger subtitles, choose “Visual Zoom” in ⚙ Accessibility.",
            "On a phone or tablet, rotate the device to landscape."
          ]
        }
      }
    },

    {
      id: 'resume_position',
      title: {
        fr: "Reprendre là où je m'étais arrêté",
        en: "Resuming where I left off"
      },
      questions: {
        fr: [
          "Comment reprendre où je me suis arrêté ?",
          "Le cours se souvient-il de ma position ?",
          "J'ai fermé la page, où en étais-je ?",
          "Reprendre la lecture plus tard"
        ],
        en: [
          "How do I resume where I stopped?",
          "Does the course remember my position?",
          "I closed the page, where was I?",
          "Resume playback later"
        ]
      },
      answer: {
        fr: {
          text: "BRIDGE mémorise vos réglages mais pas votre position : à chaque ouverture, la lecture repart du début du premier chapitre.",
          steps: [
            "Avant de quitter, notez le chapitre et le minutage affichés (par exemple chapitre 3 à 12:40).",
            "À votre retour, choisissez le chapitre dans ☰ Menu puis cliquez sur la barre de progression.",
            "Vous pouvez aussi demander à l'assistant le thème où vous vous étiez arrêté : il propose un lien direct vers le passage.",
            "Dans 📄 Transcription, cliquez sur une ligne pour sauter à ce moment."
          ]
        },
        en: {
          text: "BRIDGE remembers your settings but not your position: every time you open it, playback starts again at the beginning of the first chapter.",
          steps: [
            "Before leaving, note the chapter and the time shown (for example chapter 3 at 12:40).",
            "When you return, choose the chapter in ☰ Menu, then click the progress bar.",
            "You can also ask the assistant for the topic where you stopped: it offers a direct link to the passage.",
            "In 📄 Transcript, click a line to jump to that moment."
          ]
        }
      }
    },

    /* =====================================================================
       CHAPITRES
       ===================================================================== */
    {
      id: 'change_chapter',
      title: {
        fr: "Changer de chapitre",
        en: "Switching chapters"
      },
      questions: {
        fr: [
          "Comment changer de chapitre ?",
          "Où est la liste des chapitres ?",
          "Comment aller au chapitre 3 ?",
          "Menu des chapitres"
        ],
        en: [
          "How do I change chapter?",
          "Where is the chapter list?",
          "How do I go to chapter 3?",
          "Chapter menu"
        ]
      },
      answer: {
        fr: {
          text: "Les chapitres se trouvent dans la liste déroulante « Chapitre » du menu.",
          steps: [
            "Cliquez sur ☰ Menu en haut à gauche.",
            "Ouvrez la liste « Chapitre » et choisissez le chapitre voulu.",
            "Le chapitre se charge ; cliquez sur ▶ pour lancer la lecture.",
            "Astuce : écrivez « chapitre 3 » à l'assistant pour obtenir un lien direct."
          ]
        },
        en: {
          text: "Chapters are in the “Chapter” drop-down list of the menu.",
          steps: [
            "Click ☰ Menu at the top left.",
            "Open the “Chapter” list and choose the chapter you want.",
            "The chapter loads; click ▶ to start playback.",
            "Tip: type “chapter 3” to the assistant to get a direct link."
          ]
        }
      }
    },

    {
      id: 'auto_next_chapter',
      title: {
        fr: "Passage automatique au chapitre suivant",
        en: "Automatic move to the next chapter"
      },
      questions: {
        fr: [
          "Le chapitre suivant démarre-t-il tout seul ?",
          "Que signifie le sablier ?",
          "Comment annuler le passage au chapitre suivant ?",
          "Que se passe-t-il à la fin d'un chapitre ?"
        ],
        en: [
          "Does the next chapter start by itself?",
          "What does the hourglass mean?",
          "How do I cancel the move to the next chapter?",
          "What happens at the end of a chapter?"
        ]
      },
      answer: {
        fr: {
          text: "À la fin d'un chapitre, un sablier ⏳ et le message « Prochain chapitre » s'affichent pendant 4 secondes, puis le chapitre suivant démarre. Après le dernier chapitre, rien ne se passe.",
          steps: [
            "Laissez le décompte aller à son terme pour enchaîner automatiquement.",
            "Pour annuler, choisissez un autre chapitre dans le menu ou cliquez sur la barre de progression pendant le sablier.",
            "Pour revoir un chapitre terminé, sélectionnez-le dans la liste « Chapitre »."
          ]
        },
        en: {
          text: "At the end of a chapter, an hourglass ⏳ and the message “Next chapter” appear for 4 seconds, then the next chapter starts. After the last chapter, nothing happens.",
          steps: [
            "Let the countdown finish to move on automatically.",
            "To cancel, pick another chapter in the menu or click the progress bar while the hourglass is showing.",
            "To watch a finished chapter again, select it in the “Chapter” list."
          ]
        }
      }
    },

    /* =====================================================================
       LANGUES, SOUS-TITRES, TRANSCRIPTION
       ===================================================================== */
    {
      id: 'change_language',
      title: {
        fr: "Changer de langue",
        en: "Changing the language"
      },
      questions: {
        fr: [
          "Comment changer de langue ?",
          "Comment mettre le cours en anglais ?",
          "Où choisir la langue ?",
          "Comment traduire le cours ?"
        ],
        en: [
          "How do I change the language?",
          "How do I switch the course to French?",
          "Where do I choose the language?",
          "How do I translate the course?"
        ]
      },
      answer: {
        fr: {
          text: "La liste « Sous-titres » du menu change d'un coup la langue des sous-titres, de la voix, des diapositives et de l'interface.",
          steps: [
            "Ouvrez ☰ Menu.",
            "Dans la liste « Sous-titres », choisissez votre langue.",
            "Votre position dans le chapitre est conservée.",
            "Votre choix est mémorisé pour la prochaine visite."
          ]
        },
        en: {
          text: "The “Subtitles” list in the menu changes the language of subtitles, voice, slides and interface all at once.",
          steps: [
            "Open ☰ Menu.",
            "In the “Subtitles” list, choose your language.",
            "Your position in the chapter is kept.",
            "Your choice is remembered for the next visit."
          ]
        }
      }
    },

    {
      id: 'available_languages',
      title: {
        fr: "Langues disponibles",
        en: "Available languages"
      },
      questions: {
        fr: [
          "Quelles langues sont disponibles ?",
          "Le cours existe-t-il en espagnol ?",
          "Y a-t-il une version italienne ?",
          "Combien de langues ?"
        ],
        en: [
          "Which languages are available?",
          "Is the course available in Spanish?",
          "Is there an Italian version?",
          "How many languages?"
        ]
      },
      answer: {
        fr: {
          text: "Le cours est proposé en français, anglais, espagnol et italien. D'autres langues (allemand, portugais, néerlandais, polonais, russe, chinois, japonais, arabe, turc, coréen) offrent une interface traduite avec un cours encore en français.",
          steps: [
            "Ouvrez la liste « Sous-titres » du menu pour voir toutes les langues.",
            "Les langues marquées 🔒 👉 Fr affichent l'interface traduite mais le cours en français.",
            "Si un chapitre n'existe pas dans votre langue, le français s'affiche automatiquement.",
            "Certains chapitres peuvent encore être en cours de traduction."
          ]
        },
        en: {
          text: "The course is offered in French, English, Spanish and Italian. Other languages (German, Portuguese, Dutch, Polish, Russian, Chinese, Japanese, Arabic, Turkish, Korean) offer a translated interface with the course still in French.",
          steps: [
            "Open the “Subtitles” list in the menu to see every language.",
            "Languages marked 🔒 👉 Fr show a translated interface but the course in French.",
            "If a chapter does not exist in your language, French is shown automatically.",
            "Some chapters may still be being translated."
          ]
        }
      }
    },

    {
      id: 'language_locked',
      title: {
        fr: "Que signifie « 🔒 👉 Fr » ?",
        en: "What does “🔒 👉 Fr” mean?"
      },
      questions: {
        fr: [
          "Que veut dire le cadenas à côté de certaines langues ?",
          "Pourquoi le cours reste-t-il en français ?",
          "Pourquoi la voix est en français alors que j'ai choisi une autre langue ?",
          "Langue verrouillée"
        ],
        en: [
          "What does the padlock next to some languages mean?",
          "Why does the course stay in French?",
          "Why is the voice in French although I chose another language?",
          "Locked language"
        ]
      },
      answer: {
        fr: {
          text: "Le cadenas indique que le contenu du cours (voix, sous-titres, diapositives) n'est pas encore traduit dans cette langue : il s'affiche en français, tandis que les libellés de l'interface sont traduits.",
          steps: [
            "Choisissez quand même cette langue si vous souhaitez une interface dans votre langue.",
            "Pour un cours complet, choisissez Français, English, Español ou Italiano.",
            "Les langues verrouillées s'ouvriront à mesure que les traductions seront ajoutées."
          ]
        },
        en: {
          text: "The padlock means the course content (voice, subtitles, slides) is not yet translated into that language: it is shown in French, while the interface labels are translated.",
          steps: [
            "Still pick that language if you want an interface in your own language.",
            "For a complete course, choose Français, English, Español or Italiano.",
            "Locked languages will open up as translations are added."
          ]
        }
      }
    },

    {
      id: 'subtitles_toggle',
      title: {
        fr: "Afficher ou masquer les sous-titres",
        en: "Showing or hiding subtitles"
      },
      questions: {
        fr: [
          "Comment activer les sous-titres ?",
          "Comment enlever les sous-titres ?",
          "Où sont les sous-titres ?",
          "Sous-titres désactivés"
        ],
        en: [
          "How do I turn subtitles on?",
          "How do I remove the subtitles?",
          "Where are the subtitles?",
          "Subtitles turned off"
        ]
      },
      answer: {
        fr: {
          text: "Les sous-titres se règlent avec la liste « Sous-titres » du menu.",
          steps: [
            "Ouvrez ☰ Menu.",
            "Dans la liste « Sous-titres », choisissez une langue pour les afficher.",
            "Choisissez « Aucun » pour les masquer ; la voix, les diapositives et l'interface repassent alors en français.",
            "Vous pouvez toujours lire le texte complet dans 📄 Transcription."
          ]
        },
        en: {
          text: "Subtitles are controlled with the “Subtitles” list in the menu.",
          steps: [
            "Open ☰ Menu.",
            "In the “Subtitles” list, choose a language to show them.",
            "Choose “None” to hide them; voice, slides and interface then switch back to French.",
            "You can still read the full text in 📄 Transcript."
          ]
        }
      }
    },

    {
      id: 'subtitle_size',
      title: {
        fr: "Modifier la taille des sous-titres",
        en: "Changing the subtitle size"
      },
      questions: {
        fr: [
          "Comment agrandir les sous-titres ?",
          "Comment changer la taille du texte ?",
          "Option DYS",
          "Zoom visuel"
        ],
        en: [
          "How do I enlarge the subtitles?",
          "How do I change the text size?",
          "SpLD option",
          "Visual zoom"
        ]
      },
      answer: {
        fr: {
          text: "Trois présentations sont proposées dans ⚙ Accessibilité : DYS (pensée pour les lecteurs « dys »), Normale et Zoom visuel (grands caractères).",
          steps: [
            "Ouvrez ☰ Menu puis ⚙ Accessibilité.",
            "Dans « Taille des sous-titres », choisissez DYS, Normale ou Zoom visuel.",
            "Combinez avec le contraste élevé si nécessaire.",
            "Le réglage est mémorisé pour vos prochaines visites."
          ]
        },
        en: {
          text: "Three presentations are offered in ⚙ Accessibility: SpLD (designed for readers with dyslexia and other learning differences), Normal and Visual Zoom (large characters).",
          steps: [
            "Open ☰ Menu, then ⚙ Accessibility.",
            "Under “Subtitle size”, choose SpLD, Normal or Visual Zoom.",
            "Combine with high contrast if needed.",
            "The setting is remembered for your next visits."
          ]
        }
      }
    },

    {
      id: 'contrast_high',
      title: {
        fr: "Activer le contraste élevé",
        en: "Turning on high contrast"
      },
      questions: {
        fr: [
          "Comment augmenter le contraste ?",
          "Contraste élevé",
          "Mode haut contraste",
          "Comment mieux distinguer les sous-titres ?"
        ],
        en: [
          "How do I increase the contrast?",
          "High contrast",
          "High contrast mode",
          "How do I make the subtitles stand out more?"
        ]
      },
      answer: {
        fr: {
          text: "Le contraste élevé rend les sous-titres plus nets sur le fond de la diapositive.",
          steps: [
            "Ouvrez ☰ Menu puis ⚙ Accessibilité.",
            "Dans « Contraste », choisissez « Élevé ».",
            "Revenez à « Normal » pour le désactiver.",
            "Le réglage est mémorisé pour vos prochaines visites."
          ]
        },
        en: {
          text: "High contrast makes the subtitles sharper against the slide background.",
          steps: [
            "Open ☰ Menu, then ⚙ Accessibility.",
            "Under “Contrast”, choose “High”.",
            "Switch back to “Normal” to turn it off.",
            "The setting is remembered for your next visits."
          ]
        }
      }
    },

    {
      id: 'subtitles_readability',
      title: {
        fr: "Mieux lire les sous-titres",
        en: "Making subtitles easier to read"
      },
      questions: {
        fr: [
          "Je lis mal les sous-titres",
          "Les sous-titres sont trop petits",
          "Les sous-titres défilent trop vite",
          "Aide pour la dyslexie ou la vue"
        ],
        en: [
          "I find the subtitles hard to read",
          "The subtitles are too small",
          "The subtitles go by too fast",
          "Help for dyslexia or low vision"
        ]
      },
      answer: {
        fr: {
          text: "Plusieurs réglages se combinent pour lire plus confortablement.",
          steps: [
            "Choisissez « Zoom visuel » ou « DYS » dans la taille des sous-titres (⚙ Accessibilité).",
            "Activez le contraste élevé.",
            "Ralentissez la lecture à 0,75×.",
            "Lisez le texte à votre rythme dans 📄 Transcription.",
            "Au besoin, agrandissez la page avec Ctrl et + (Cmd et + sur Mac)."
          ]
        },
        en: {
          text: "Several settings can be combined to read more comfortably.",
          steps: [
            "Choose “Visual Zoom” or “SpLD” for the subtitle size (⚙ Accessibility).",
            "Turn on high contrast.",
            "Slow playback down to 0.75×.",
            "Read the text at your own pace in 📄 Transcript.",
            "If needed, enlarge the page with Ctrl and + (Cmd and + on a Mac)."
          ]
        }
      }
    },

    {
      id: 'slides_audio_language',
      title: {
        fr: "Voix et diapositives dans ma langue",
        en: "Voice and slides in my language"
      },
      questions: {
        fr: [
          "Comment écouter le cours en espagnol ?",
          "Les diapositives sont-elles traduites ?",
          "Pourquoi la voix change quand je change de langue ?",
          "La voix est en français"
        ],
        en: [
          "How do I listen to the course in Spanish?",
          "Are the slides translated?",
          "Why does the voice change when I change language?",
          "The voice is in French"
        ]
      },
      answer: {
        fr: {
          text: "La voix et les diapositives suivent la langue choisie dans la liste « Sous-titres ». Si un fichier n'existe pas dans cette langue, la version française est utilisée à la place.",
          steps: [
            "Choisissez la langue dans ☰ Menu > « Sous-titres ».",
            "La voix reprend au même instant dans la nouvelle langue.",
            "Si une diapositive ou une voix manque, le français s'affiche : c'est un repli automatique.",
            "Signalez les manques à SciencExpert pour qu'ils soient complétés."
          ]
        },
        en: {
          text: "Voice and slides follow the language chosen in the “Subtitles” list. If a file does not exist in that language, the French version is used instead.",
          steps: [
            "Choose the language in ☰ Menu > “Subtitles”.",
            "The voice resumes at the same moment in the new language.",
            "If a slide or a voice track is missing, French is shown: this is an automatic fallback.",
            "Report missing items to SciencExpert so they can be completed."
          ]
        }
      }
    },

    {
      id: 'transcript_open',
      title: {
        fr: "Lire la transcription complète",
        en: "Reading the full transcript"
      },
      questions: {
        fr: [
          "Où trouver la transcription ?",
          "Comment lire le texte du cours ?",
          "Transcription du chapitre",
          "Comment aller à un passage depuis la transcription ?"
        ],
        en: [
          "Where is the transcript?",
          "How do I read the course text?",
          "Chapter transcript",
          "How do I jump to a passage from the transcript?"
        ]
      },
      answer: {
        fr: {
          text: "Le panneau 📄 Transcription affiche tout le texte du chapitre avec les minutages.",
          steps: [
            "Ouvrez ☰ Menu puis cliquez sur 📄 Transcription.",
            "Parcourez la liste : chaque ligne indique son intervalle de temps.",
            "Cliquez sur une ligne pour lancer la lecture à ce moment.",
            "Cliquez de nouveau sur 📄 Transcription pour fermer le panneau."
          ]
        },
        en: {
          text: "The 📄 Transcript panel shows the whole text of the chapter with timestamps.",
          steps: [
            "Open ☰ Menu, then click 📄 Transcript.",
            "Scroll through the list: each line shows its time range.",
            "Click a line to start playback at that moment.",
            "Click 📄 Transcript again to close the panel."
          ]
        }
      }
    },

    {
      id: 'transcript_copy',
      title: {
        fr: "Copier ou conserver le texte du cours",
        en: "Copying or keeping the course text"
      },
      questions: {
        fr: [
          "Puis-je télécharger les sous-titres ?",
          "Comment copier la transcription ?",
          "Comment imprimer le cours ?",
          "Comment prendre des notes à partir du texte ?"
        ],
        en: [
          "Can I download the subtitles?",
          "How do I copy the transcript?",
          "How do I print the course?",
          "How do I take notes from the text?"
        ]
      },
      answer: {
        fr: {
          text: "Il n'existe pas de téléchargement intégré : la transcription s'affiche à l'écran et peut être sélectionnée puis copiée pour vos notes personnelles.",
          steps: [
            "Ouvrez 📄 Transcription.",
            "Sélectionnez le texte souhaité à la souris puis copiez-le (Ctrl+C ou Cmd+C).",
            "Collez-le dans votre document de notes, en gardant les minutages si utile.",
            "Respectez les droits d'auteur : usage personnel, sauf accord de SciencExpert."
          ]
        },
        en: {
          text: "There is no built-in download: the transcript is shown on screen and can be selected and copied for your personal notes.",
          steps: [
            "Open 📄 Transcript.",
            "Select the text you want with the mouse, then copy it (Ctrl+C or Cmd+C).",
            "Paste it into your notes, keeping the timestamps if useful.",
            "Respect copyright: personal use only, unless SciencExpert agrees otherwise."
          ]
        }
      }
    },

    /* =====================================================================
       MENU, ACCESSIBILITÉ, PRÉFÉRENCES
       ===================================================================== */
    {
      id: 'menu_open',
      title: {
        fr: "Ouvrir le menu",
        en: "Opening the menu"
      },
      questions: {
        fr: [
          "Où est le menu ?",
          "Comment afficher les commandes ?",
          "Les boutons ont disparu",
          "Comment faire apparaître la barre de contrôle ?"
        ],
        en: [
          "Where is the menu?",
          "How do I show the controls?",
          "The buttons have disappeared",
          "How do I bring up the control bar?"
        ]
      },
      answer: {
        fr: {
          text: "Le lecteur démarre en affichage épuré : seule la diapositive est visible. Les commandes se trouvent derrière le bouton ☰ Menu.",
          steps: [
            "Cliquez sur ☰ Menu en haut à gauche.",
            "La barre de contrôle apparaît : chapitre, lecture, temps, sous-titres, accessibilité, transcription.",
            "Cliquez de nouveau sur ☰ Menu pour la masquer.",
            "Le petit badge (FR, EN…) rappelle la langue active."
          ]
        },
        en: {
          text: "The player starts in a clean view: only the slide is visible. The controls are behind the ☰ Menu button.",
          steps: [
            "Click ☰ Menu at the top left.",
            "The control bar appears: chapter, play, time, subtitles, accessibility, transcript.",
            "Click ☰ Menu again to hide it.",
            "The small badge (FR, EN…) shows the active language."
          ]
        }
      }
    },

    {
      id: 'accessibility_panel',
      title: {
        fr: "Panneau Accessibilité",
        en: "Accessibility panel"
      },
      questions: {
        fr: [
          "Quelles options d'accessibilité existe-t-il ?",
          "Comment ouvrir l'accessibilité ?",
          "Réglages pour la dyslexie",
          "Options pour les malvoyants"
        ],
        en: [
          "What accessibility options are there?",
          "How do I open accessibility?",
          "Settings for dyslexia",
          "Options for low vision"
        ]
      },
      answer: {
        fr: {
          text: "Le bouton ⚙ Accessibilité regroupe trois réglages : taille des sous-titres, contraste et vitesse de lecture.",
          steps: [
            "Ouvrez ☰ Menu puis cliquez sur ⚙ Accessibilité.",
            "Réglez la taille des sous-titres (DYS, Normale, Zoom visuel).",
            "Choisissez le contraste Normal ou Élevé.",
            "Choisissez la vitesse de lecture, de 0,75× à 2×.",
            "Ouvrir ce panneau ferme la transcription, et inversement."
          ]
        },
        en: {
          text: "The ⚙ Accessibility button groups three settings: subtitle size, contrast and playback speed.",
          steps: [
            "Open ☰ Menu, then click ⚙ Accessibility.",
            "Set the subtitle size (SpLD, Normal, Visual Zoom).",
            "Choose Normal or High contrast.",
            "Choose the playback speed, from 0.75× to 2×.",
            "Opening this panel closes the transcript, and vice versa."
          ]
        }
      }
    },

    {
      id: 'preferences_saved',
      title: {
        fr: "Mémorisation de mes préférences",
        en: "Saving my preferences"
      },
      questions: {
        fr: [
          "Mes réglages sont-ils enregistrés ?",
          "BRIDGE retient-il ma langue ?",
          "Comment effacer mes préférences ?",
          "Pourquoi mes réglages ont-ils changé ?"
        ],
        en: [
          "Are my settings saved?",
          "Does BRIDGE remember my language?",
          "How do I clear my preferences?",
          "Why did my settings change?"
        ]
      },
      answer: {
        fr: {
          text: "La langue, la taille des sous-titres, le contraste, la vitesse et l'état du son sont mémorisés dans votre navigateur et réappliqués à la visite suivante.",
          steps: [
            "Ces préférences restent sur votre appareil et votre navigateur : elles ne suivent pas d'un appareil à l'autre.",
            "Elles disparaissent si vous videz les données du site ou naviguez en mode privé.",
            "Pour repartir de zéro, réglez de nouveau les options ou videz les données du site dans votre navigateur.",
            "La position dans le cours n'est pas mémorisée."
          ]
        },
        en: {
          text: "Language, subtitle size, contrast, speed and sound state are saved in your browser and reapplied on your next visit.",
          steps: [
            "These preferences stay on your device and browser: they do not follow you from one device to another.",
            "They disappear if you clear the site's data or browse in private mode.",
            "To start from scratch, set the options again or clear the site's data in your browser.",
            "Your position in the course is not saved."
          ]
        }
      }
    },

    {
      id: 'reset_page',
      title: {
        fr: "Utiliser le bouton Reset",
        en: "Using the Reset button"
      },
      questions: {
        fr: [
          "À quoi sert le bouton Reset ?",
          "Comment tout réinitialiser ?",
          "Le lecteur est bloqué",
          "Comment recharger la page ?"
        ],
        en: [
          "What is the Reset button for?",
          "How do I reset everything?",
          "The player is stuck",
          "How do I reload the page?"
        ]
      },
      answer: {
        fr: {
          text: "Le bouton ♻️ Reset (en bas de page) recharge le lecteur : le cours repart du début, en conservant vos préférences mémorisées.",
          steps: [
            "Cliquez sur ♻️ Reset dans le pied de page.",
            "Attendez le rechargement : le premier chapitre se charge.",
            "Retrouvez votre chapitre dans ☰ Menu > « Chapitre ».",
            "Si le problème persiste, videz le cache du navigateur."
          ]
        },
        en: {
          text: "The ♻️ Reset button (at the bottom of the page) reloads the player: the course starts again from the beginning, keeping your saved preferences.",
          steps: [
            "Click ♻️ Reset in the footer.",
            "Wait for the reload: the first chapter loads.",
            "Find your chapter in ☰ Menu > “Chapter”.",
            "If the problem persists, clear your browser cache."
          ]
        }
      }
    },

    {
      id: 'back_to_main_menu',
      title: {
        fr: "Retourner au menu principal",
        en: "Going back to the main menu"
      },
      questions: {
        fr: [
          "Comment quitter le cours ?",
          "Comment revenir au menu principal ?",
          "Bouton ShapeMate",
          "Comment retourner à l'accueil ?"
        ],
        en: [
          "How do I leave the course?",
          "How do I go back to the main menu?",
          "ShapeMate button",
          "How do I return to the home page?"
        ]
      },
      answer: {
        fr: {
          text: "Le bouton ShapeMate™ du pied de page ramène au menu principal.",
          steps: [
            "Faites défiler jusqu'au pied de page si nécessaire.",
            "Cliquez sur ShapeMate™, à gauche.",
            "Vous quittez le lecteur : notez votre position si vous voulez reprendre plus tard."
          ]
        },
        en: {
          text: "The ShapeMate™ button in the footer takes you back to the main menu.",
          steps: [
            "Scroll down to the footer if needed.",
            "Click ShapeMate™, on the left.",
            "You leave the player: note your position if you want to resume later."
          ]
        }
      }
    },

    /* =====================================================================
       ASSISTANT
       ===================================================================== */
    {
      id: 'use_assistant',
      title: {
        fr: "Utiliser l'assistant",
        en: "Using the assistant"
      },
      questions: {
        fr: [
          "Comment utiliser l'assistant ?",
          "Comment fonctionne le chatbot ?",
          "Que peut faire Gérard ?",
          "Comment rechercher un passage du cours ?"
        ],
        en: [
          "How do I use the assistant?",
          "How does the chatbot work?",
          "What can Gérard do?",
          "How do I search for a passage of the course?"
        ]
      },
      answer: {
        fr: {
          text: "Je retrouve les passages du cours correspondant à votre question dans les sous-titres.",
          steps: [
            "Saisissez une question ou quelques mots-clés.",
            "Consultez les passages proposés.",
            "Cliquez sur « Aller à ce passage » pour lancer la lecture à cet endroit.",
            "Cliquez sur « Voir d'autres passages » si vous souhaitez consulter davantage de résultats."
          ]
        },
        en: {
          text: "I find the course passages that match your question in the subtitles.",
          steps: [
            "Type a question or a few keywords.",
            "Look through the suggested passages.",
            "Click “Go to this passage” to start playback at that spot.",
            "Click “Show more passages” if you want to see more results."
          ]
        }
      }
    },

    {
      id: 'open_close_assistant',
      title: {
        fr: "Ouvrir, fermer et vider l'assistant",
        en: "Opening, closing and clearing the assistant"
      },
      questions: {
        fr: [
          "Où est l'assistant ?",
          "Comment ouvrir le chatbot ?",
          "Comment fermer la fenêtre de discussion ?",
          "Comment effacer la conversation ?"
        ],
        en: [
          "Where is the assistant?",
          "How do I open the chatbot?",
          "How do I close the chat window?",
          "How do I clear the conversation?"
        ]
      },
      answer: {
        fr: {
          text: "L'assistant est accessible par l'icône 💬 en bas de l'écran.",
          steps: [
            "Cliquez sur 💬 pour ouvrir la fenêtre de discussion.",
            "Cliquez sur ✕ ou appuyez sur Échap pour la fermer ; la conversation est conservée tant que la page n'est pas rechargée.",
            "Cliquez sur 🗑 pour effacer la conversation et recommencer.",
            "La lecture continue pendant que vous discutez : mettez en pause si besoin."
          ]
        },
        en: {
          text: "The assistant is available through the 💬 icon at the bottom of the screen.",
          steps: [
            "Click 💬 to open the chat window.",
            "Click ✕ or press Esc to close it; the conversation is kept until the page is reloaded.",
            "Click 🗑 to clear the conversation and start over.",
            "Playback keeps going while you chat: pause it if needed."
          ]
        }
      }
    },

    {
      id: 'ask_tips',
      title: {
        fr: "Bien formuler sa question",
        en: "Asking good questions"
      },
      questions: {
        fr: [
          "Comment poser une bonne question ?",
          "Que dois-je écrire pour trouver un passage ?",
          "L'assistant ne me comprend pas",
          "Quels mots utiliser ?"
        ],
        en: [
          "How do I ask a good question?",
          "What should I type to find a passage?",
          "The assistant does not understand me",
          "Which words should I use?"
        ]
      },
      answer: {
        fr: {
          text: "L'assistant cherche des mots-clés dans les sous-titres : des termes précis donnent de meilleurs résultats que de longues phrases.",
          steps: [
            "Utilisez un ou deux mots importants (le nom d'une notion, d'un produit ou d'une méthode vue en cours).",
            "Évitez les formulations trop générales comme « parle-moi du cours ».",
            "Essayez un synonyme si rien ne sort ; une petite faute de frappe est tolérée.",
            "Posez ensuite une seconde question plus précise pour affiner."
          ]
        },
        en: {
          text: "The assistant looks for keywords in the subtitles: precise terms give better results than long sentences.",
          steps: [
            "Use one or two important words (the name of a concept, a product or a method from the course).",
            "Avoid overly general wording such as “tell me about the course”.",
            "Try a synonym if nothing comes up; a small typo is tolerated.",
            "Then ask a second, more specific question to narrow it down."
          ]
        }
      }
    },

    {
      id: 'assistant_no_result',
      title: {
        fr: "Quand l'assistant ne trouve rien",
        en: "When the assistant finds nothing"
      },
      questions: {
        fr: [
          "L'assistant ne trouve aucun passage",
          "Pourquoi aucune réponse ?",
          "Aucun résultat",
          "L'assistant dit qu'il n'a rien trouvé"
        ],
        en: [
          "The assistant finds no passage",
          "Why is there no answer?",
          "No results",
          "The assistant says it found nothing"
        ]
      },
      answer: {
        fr: {
          text: "Si aucun passage ne correspond, l'assistant l'indique et propose des sujets abordés dans le cours.",
          steps: [
            "Reformulez avec un ou deux mots-clés différents.",
            "Vérifiez l'orthographe et utilisez le vocabulaire du cours.",
            "Cliquez sur l'un des sujets proposés sous le message.",
            "Si le sujet n'apparaît pas dans les sous-titres, il ne figure peut-être pas dans le cours."
          ]
        },
        en: {
          text: "If no passage matches, the assistant says so and suggests topics covered in the course.",
          steps: [
            "Rephrase with one or two different keywords.",
            "Check the spelling and use the course vocabulary.",
            "Click one of the topics suggested under the message.",
            "If the subject does not appear in the subtitles, it may not be in the course."
          ]
        }
      }
    },

    {
      id: 'assistant_results',
      title: {
        fr: "Comprendre les résultats de l'assistant",
        en: "Understanding the assistant's results"
      },
      questions: {
        fr: [
          "Que signifient les résultats de l'assistant ?",
          "Comment voir plus de résultats ?",
          "Comment aller à un passage proposé ?",
          "Pourquoi certains mots sont-ils surlignés ?"
        ],
        en: [
          "What do the assistant's results mean?",
          "How do I see more results?",
          "How do I go to a suggested passage?",
          "Why are some words highlighted?"
        ]
      },
      answer: {
        fr: {
          text: "Chaque résultat est une carte indiquant le chapitre, le minutage et un extrait où vos mots-clés sont surlignés.",
          steps: [
            "Lisez l'extrait pour vérifier qu'il répond à votre question.",
            "Cliquez sur « Aller à ce passage » pour ouvrir le chapitre et lancer la lecture un instant avant.",
            "Cliquez sur « Voir d'autres passages » pour afficher les résultats suivants.",
            "Un petit badge de langue (FR, EN…) signale un extrait affiché dans une autre langue que la vôtre."
          ]
        },
        en: {
          text: "Each result is a card showing the chapter, the time and an excerpt where your keywords are highlighted.",
          steps: [
            "Read the excerpt to check that it answers your question.",
            "Click “Go to this passage” to open the chapter and start playback just before it.",
            "Click “Show more passages” to display the next results.",
            "A small language badge (FR, EN…) marks an excerpt shown in a language other than yours."
          ]
        }
      }
    },

    {
      id: 'assistant_language',
      title: {
        fr: "Langue des réponses de l'assistant",
        en: "Language of the assistant's answers"
      },
      questions: {
        fr: [
          "Dans quelle langue l'assistant répond-il ?",
          "Puis-je poser ma question en anglais ?",
          "L'assistant ne comprend pas ma langue",
          "Pourquoi les résultats sont-ils en français ?"
        ],
        en: [
          "In which language does the assistant answer?",
          "Can I ask my question in English?",
          "The assistant does not understand my language",
          "Why are the results in French?"
        ]
      },
      answer: {
        fr: {
          text: "L'assistant cherche dans les sous-titres de la langue active. Si le cours n'est pas encore disponible dans cette langue, il utilise le français.",
          steps: [
            "Choisissez la langue du cours dans ☰ Menu > « Sous-titres ».",
            "Posez votre question avec les mots de cette langue.",
            "Si la langue choisie n'a pas encore de sous-titres, posez votre question en français : c'est la langue des passages affichés.",
            "L'assistant signale quand des passages sont affichés dans une autre langue."
          ]
        },
        en: {
          text: "The assistant searches the subtitles of the active language. If the course is not yet available in that language, it uses French.",
          steps: [
            "Choose the course language in ☰ Menu > “Subtitles”.",
            "Ask your question using words from that language.",
            "If the chosen language has no subtitles yet, ask in French: that is the language of the passages shown.",
            "The assistant tells you when passages are shown in another language."
          ]
        }
      }
    },

    {
      id: 'assistant_chapter_shortcut',
      title: {
        fr: "Aller directement à un chapitre avec l'assistant",
        en: "Jumping to a chapter with the assistant"
      },
      questions: {
        fr: [
          "Comment demander un chapitre à l'assistant ?",
          "Ouvre le chapitre 2",
          "Aller au chapitre 4",
          "chapitre 5"
        ],
        en: [
          "How do I ask the assistant for a chapter?",
          "Open chapter 2",
          "Go to chapter 4",
          "chapter 5"
        ]
      },
      answer: {
        fr: {
          text: "Écrivez « chapitre » suivi d'un numéro : l'assistant affiche le titre du chapitre et un bouton pour y aller.",
          steps: [
            "Ouvrez l'assistant 💬.",
            "Tapez par exemple « chapitre 3 ».",
            "Cliquez sur « Aller à ce passage » pour ouvrir le chapitre depuis le début."
          ]
        },
        en: {
          text: "Type “chapter” followed by a number: the assistant shows the chapter title and a button to go there.",
          steps: [
            "Open the assistant 💬.",
            "Type for example “chapter 3”.",
            "Click “Go to this passage” to open the chapter from the beginning."
          ]
        }
      }
    },

    {
      id: 'assistant_limits',
      title: {
        fr: "Ce que l'assistant sait faire (et ne pas faire)",
        en: "What the assistant can and cannot do"
      },
      questions: {
        fr: [
          "L'assistant est-il une intelligence artificielle ?",
          "L'assistant peut-il reformuler ou expliquer ?",
          "Pourquoi l'assistant ne répond pas à mon calcul ?",
          "Quelles sont les limites de l'assistant ?"
        ],
        en: [
          "Is the assistant an artificial intelligence?",
          "Can the assistant rephrase or explain?",
          "Why does the assistant not answer my calculation?",
          "What are the assistant's limits?"
        ]
      },
      answer: {
        fr: {
          text: "Cette version de l'assistant n'utilise pas d'IA générative : il retrouve des passages existants du cours, mais ne rédige ni réponse nouvelle ni reformulation.",
          steps: [
            "Il cherche uniquement dans les sous-titres du cours.",
            "Il ne lit pas le contenu des diapositives (formules, schémas, graphiques).",
            "Il ne corrige pas d'exercices et ne fait pas de calculs.",
            "Pour une explication plus simple, relisez le passage proposé ou ouvrez le chapitre correspondant."
          ]
        },
        en: {
          text: "This version of the assistant does not use generative AI: it retrieves existing passages of the course, but does not write new answers or rephrasings.",
          steps: [
            "It only searches the course subtitles.",
            "It does not read the content of the slides (formulas, diagrams, charts).",
            "It does not mark exercises and does not do calculations.",
            "For a simpler explanation, reread the suggested passage or open the matching chapter."
          ]
        }
      }
    },

    {
      id: 'assistant_privacy',
      title: {
        fr: "Confidentialité de l'assistant",
        en: "Assistant privacy"
      },
      questions: {
        fr: [
          "L'assistant enregistre-t-il mes questions ?",
          "Mes questions sont-elles envoyées sur Internet ?",
          "L'assistant connaît-il mon nom ?",
          "Confidentialité"
        ],
        en: [
          "Does the assistant record my questions?",
          "Are my questions sent over the Internet?",
          "Does the assistant know my name?",
          "Privacy"
        ]
      },
      answer: {
        fr: {
          text: "L'assistant ne demande ni nom ni compte. Dans cette version, la recherche se fait dans votre navigateur, sur les sous-titres déjà chargés par le lecteur : vos questions ne sont pas envoyées à un service d'IA externe.",
          steps: [
            "Aucune identification n'est nécessaire pour poser une question.",
            "La conversation disparaît quand vous rechargez la page ou cliquez sur 🗑.",
            "Vos préférences d'affichage (langue, contraste…) sont les seules données conservées, sur votre appareil."
          ]
        },
        en: {
          text: "The assistant asks for no name and no account. In this version, the search runs in your browser on the subtitles already loaded by the player: your questions are not sent to an external AI service.",
          steps: [
            "No identification is needed to ask a question.",
            "The conversation disappears when you reload the page or click 🗑.",
            "Your display preferences (language, contrast…) are the only data kept, on your device."
          ]
        }
      }
    },

    {
      id: 'ask_about_bridge',
      title: {
        fr: "Poser une question sur le fonctionnement de BRIDGE",
        en: "Asking about how BRIDGE works"
      },
      questions: {
        fr: [
          "Peux-tu m'aider à utiliser le lecteur ?",
          "J'ai une question sur BRIDGE",
          "Aide",
          "Comment ça marche ?"
        ],
        en: [
          "Can you help me use the player?",
          "I have a question about BRIDGE",
          "Help",
          "How does it work?"
        ]
      },
      answer: {
        fr: {
          text: "En plus du contenu du cours, je peux répondre aux questions sur le fonctionnement du lecteur : langues, sous-titres, accessibilité, raccourcis, dépannage.",
          steps: [
            "Écrivez votre question avec vos propres mots (par exemple « comment agrandir les sous-titres ? »).",
            "Je vous propose la rubrique d'aide correspondante, avec les étapes à suivre.",
            "Pour une question sur le contenu scientifique, utilisez plutôt des mots-clés du cours."
          ]
        },
        en: {
          text: "Besides the course content, I can answer questions about how the player works: languages, subtitles, accessibility, shortcuts, troubleshooting.",
          steps: [
            "Write your question in your own words (for example “how do I enlarge the subtitles?”).",
            "I offer you the matching help topic, with the steps to follow.",
            "For a question about the scientific content, use keywords from the course instead."
          ]
        }
      }
    },

    /* =====================================================================
       DÉPANNAGE
       ===================================================================== */
    {
      id: 'troubleshoot_no_sound',
      title: {
        fr: "Je n'entends pas le son",
        en: "I can't hear any sound"
      },
      questions: {
        fr: [
          "Il n'y a pas de son",
          "La voix ne marche pas",
          "Je n'entends rien",
          "Problème de son"
        ],
        en: [
          "There is no sound",
          "The voice does not work",
          "I can't hear anything",
          "Sound problem"
        ]
      },
      answer: {
        fr: {
          text: "Quelques vérifications suffisent le plus souvent à retrouver la voix.",
          steps: [
            "Vérifiez que l'icône en bas à droite de l'image est 🔊 (et non 🔇) ; sinon cliquez dessus ou appuyez sur M.",
            "Contrôlez le volume de votre appareil et de votre navigateur.",
            "Cliquez sur ▶ : certains navigateurs bloquent la lecture automatique tant que vous n'avez pas cliqué.",
            "Rechargez la page avec ♻️ Reset ; si le problème persiste, signalez le chapitre et la langue concernés."
          ]
        },
        en: {
          text: "A few checks are usually enough to bring the voice back.",
          steps: [
            "Check that the icon at the bottom right of the image is 🔊 (not 🔇); if not, click it or press M.",
            "Check the volume of your device and of your browser.",
            "Click ▶: some browsers block automatic playback until you have clicked.",
            "Reload the page with ♻️ Reset; if the problem persists, report the chapter and language concerned."
          ]
        }
      }
    },

    {
      id: 'troubleshoot_no_subtitles',
      title: {
        fr: "Les sous-titres n'apparaissent pas",
        en: "Subtitles do not appear"
      },
      questions: {
        fr: [
          "Je ne vois pas les sous-titres",
          "Les sous-titres ont disparu",
          "Pas de sous-titres",
          "Sous-titres manquants"
        ],
        en: [
          "I can't see the subtitles",
          "The subtitles have disappeared",
          "No subtitles",
          "Missing subtitles"
        ]
      },
      answer: {
        fr: {
          text: "Les sous-titres ne s'affichent que pendant la lecture et lorsqu'une langue est sélectionnée.",
          steps: [
            "Ouvrez ☰ Menu et vérifiez que « Sous-titres » n'est pas sur « Aucun ».",
            "Lancez la lecture : pendant les silences, aucun sous-titre n'apparaît.",
            "Essayez une autre taille ou le contraste élevé dans ⚙ Accessibilité.",
            "Dans 📄 Transcription, vérifiez que le texte du chapitre est chargé ; sinon rechargez la page."
          ]
        },
        en: {
          text: "Subtitles only appear during playback and when a language is selected.",
          steps: [
            "Open ☰ Menu and check that “Subtitles” is not set to “None”.",
            "Start playback: during silences, no subtitle appears.",
            "Try another size or high contrast in ⚙ Accessibility.",
            "In 📄 Transcript, check that the chapter text is loaded; if not, reload the page."
          ]
        }
      }
    },

    {
      id: 'troubleshoot_no_image',
      title: {
        fr: "La diapositive ne s'affiche pas",
        en: "The slide does not display"
      },
      questions: {
        fr: [
          "L'image ne s'affiche pas",
          "J'ai un écran noir",
          "Diapositive manquante",
          "Je ne vois que du noir"
        ],
        en: [
          "The image does not display",
          "I get a black screen",
          "Missing slide",
          "I only see black"
        ]
      },
      answer: {
        fr: {
          text: "Une diapositive peut tarder à charger ou ne pas exister dans la langue choisie ; dans ce cas, la version française est utilisée.",
          steps: [
            "Patientez quelques secondes : l'image se charge au fil de la lecture.",
            "Vérifiez votre connexion Internet.",
            "Changez de langue puis revenez à la précédente pour forcer le rechargement.",
            "Cliquez sur ♻️ Reset ; si l'écran reste noir, signalez le chapitre et le minutage."
          ]
        },
        en: {
          text: "A slide may be slow to load or may not exist in the chosen language; in that case, the French version is used.",
          steps: [
            "Wait a few seconds: the image loads as playback goes on.",
            "Check your Internet connection.",
            "Switch language, then switch back to force a reload.",
            "Click ♻️ Reset; if the screen stays black, report the chapter and the time."
          ]
        }
      }
    }

  ]
};