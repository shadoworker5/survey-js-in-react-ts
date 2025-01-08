import React, { useCallback } from 'react';
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';


const surveyJson = {
  "title": "Exemple de questionnaire avec tous les types de champs",
  "description": "Ce questionnaire contient un exemple de chaque type de champ disponible dans SurveyJS.",
  "pages": [
    {
      "name": "page1",
      "title": "Informations générales",
      "elements": [
        {
          "type": "text",
          "name": "nom",
          "title": "Quel est votre nom ?",
          "isRequired": false
        },
        {
          "type": "checkbox",
          "name": "hobbies",
          "title": "Quels sont vos loisirs ?",
          "choices": ["Sport", "Lecture", "Voyages", "Jeux vidéo"]
        },
        {
          "type": "radiogroup",
          "name": "genre",
          "title": "Quel est votre genre ?",
          "choices": ["Homme", "Femme", "Autre"]
        },
        {
          "type": "dropdown",
          "name": "pays",
          "title": "Dans quel pays vivez-vous ?",
          "choicesByUrl": {
            "url": "https://restcountries.com/v3.1/all",
            "valueName": "name.common"
          }
        },
        {
          "type": "boolean",
          "name": "aime_survey",
          "title": "Aimez-vous utiliser SurveyJS ?",
          "label": "Oui / Non"
        }
      ]
    },
    {
      "name": "page2",
      "title": "Questions avancées",
      "elements": [
        {
          "type": "matrix",
          "name": "evaluation",
          "title": "Évaluez les éléments suivants",
          "columns": ["Mauvais", "Moyen", "Bon", "Excellent"],
          "rows": ["Design", "Facilité d'utilisation", "Fonctionnalités"]
        },
        {
          "type": "rating",
          "name": "satisfaction",
          "title": "Évaluez votre satisfaction",
          "rateMax": 5,
          "minRateDescription": "Très insatisfait",
          "maxRateDescription": "Très satisfait"
        },
        {
          "type": "file",
          "name": "photo",
          "title": "Veuillez télécharger une photo",
          "storeDataAsText": true,
          "maxSize": 102400
        },
        {
          "type": "comment",
          "name": "feedback",
          "title": "Veuillez partager vos commentaires"
        },
        {
          "type": "signaturepad",
          "name": "signature",
          "title": "Veuillez fournir votre signature"
        }
      ]
    },
    {
      "name": "page3",
      "title": "Questions complexes",
      "elements": [
        {
          "type": "multipletext",
          "name": "coordonnees",
          "title": "Vos coordonnées",
          "items": [
            {
              "name": "email",
              "title": "Email"
            },
            {
              "name": "telephone",
              "title": "Téléphone"
            }
          ]
        },
        {
          "type": "matrixdynamic",
          "name": "competences",
          "title": "Listez vos compétences",
          "columns": [
            { "name": "competence", "title": "Compétence", "cellType": "text" },
            { "name": "experience", "title": "Années d'expérience", "cellType": "text", "inputType": "number" }
          ],
          "rowCount": 1
        },
        {
          "type": "html",
          "name": "html_block",
          "html": "<p style='color: blue;'>Ceci est une question HTML personnalisée.</p>"
        },
        {
          "type": "expression",
          "name": "calcul_total",
          "title": "Votre score total est :",
          "expression": "{evaluation.Design} + {evaluation['Facilité d\\'utilisation']} + {evaluation.Fonctionnalités}"
        },
        {
          "type": "image",
          "name": "image_question",
          "title": "Quelle est votre réaction à cette image ?",
          "imageLink": "https://via.placeholder.com/150"
        }
      ]
    }
  ],
  "showProgressBar": "top",
  "progressBarType": "questions",
  "showQuestionNumbers": "off",
  "completedHtml": "<h3>Merci pour vos réponses !</h3>"
};

const CreateForm: React.FC = () => {
    const survey = new Model(surveyJson);
    const surveyComplete = useCallback((survey) => {
        // TODO
    }, []);

    survey.onComplete.add(surveyComplete);

    return <Survey model={survey} />;
};

export default CreateForm;