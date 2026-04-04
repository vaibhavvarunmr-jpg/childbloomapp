import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { BookIcon, ChevronRightIcon } from '../../assets/icons';
import { GUIDE_STAGES } from '../../lib/constants';

const GUIDE_CONTENT = {
  pregnancy: {
    sections: [
      { title: 'Nutrition', items: ['Eat iron-rich foods like spinach, jaggery, and dates', 'Include protein through dal, paneer, eggs, and fish', 'Take folic acid and iron supplements as prescribed', 'Stay hydrated — aim for 8-10 glasses of water daily', 'Limit caffeine to one cup of tea/coffee per day'] },
      { title: 'Prenatal Bonding', items: ['Talk and sing to your baby — they can hear from week 18', 'Play soft music or recite shlokas/prayers if culturally meaningful', 'Gentle belly massage with coconut or almond oil', 'Practice prenatal yoga or deep breathing (Pranayama)'] },
      { title: 'What to Watch For', items: ['Attend all antenatal checkups on schedule', 'Report any bleeding, severe headache, or swelling immediately', 'Monitor baby\'s kicks from week 28 — aim for 10 kicks in 2 hours', 'Get the Tdap vaccine between weeks 27-36'] },
    ],
  },
  newborn: {
    sections: [
      { title: 'Feeding (0-3 months)', items: ['Breastfeed exclusively — no water needed before 6 months', 'Feed on demand, typically 8-12 times per day', 'Burp baby after every feed', 'Watch for good latch — no pain, audible swallowing'] },
      { title: 'Sleep', items: ['Newborns sleep 14-17 hours in short stretches', 'Always place baby on their back to sleep', 'Room-share but don\'t bed-share for safety', 'Swaddling can help with the startle reflex'] },
      { title: 'Development Milestones', items: ['Focuses on faces within 8-12 inches', 'Responds to loud sounds', 'Lifts head briefly during tummy time', 'Recognises mother\'s voice and smell'] },
      { title: 'Health Essentials', items: ['BCG vaccine at birth', 'OPV and Hepatitis B within 24 hours', 'Keep umbilical stump clean and dry', 'First paediatrician visit within 48 hours of discharge'] },
    ],
  },
  infant: {
    sections: [
      { title: 'Feeding (3-12 months)', items: ['Continue breastfeeding alongside solids from 6 months', 'Start with single-ingredient purees: rice cereal, dal water, mashed banana', 'Introduce one new food every 3 days to spot allergies', 'By 9 months, try soft finger foods like idli pieces, roti strips', 'Avoid honey before age 1, and limit salt and sugar'] },
      { title: 'Motor Development', items: ['3-4 months: Rolls over, holds head steady', '5-6 months: Sits with support, reaches for objects', '7-8 months: Crawls, transfers objects between hands', '9-12 months: Pulls to stand, cruises along furniture, first steps'] },
      { title: 'Language & Social', items: ['Babbles consonant sounds (ba-ba, da-da) by 6 months', 'Responds to own name by 7-9 months', 'Waves bye-bye, plays peek-a-boo', 'Says first meaningful word around 12 months'] },
      { title: 'Vaccinations (IAP Schedule)', items: ['6 weeks: DTwP/DTaP, IPV, Hib, Rotavirus, PCV', '10 weeks: Second dose of above', '14 weeks: Third dose of above', '6 months: OPV, Influenza vaccine', '9 months: MMR first dose'] },
    ],
  },
  toddler: {
    sections: [
      { title: 'Language Explosion', items: ['12-18 months: 10-50 words, points at objects', '18-24 months: Two-word phrases ("more milk", "go park")', '2-3 years: Short sentences, 200+ words', 'Read aloud daily — picture books in any language help', 'Narrate daily activities to build vocabulary'] },
      { title: 'Nutrition', items: ['Offer family foods cut into small pieces', 'Include roti, rice, dal, vegetables, curd, and fruits daily', 'Serve whole milk and ghee — toddlers need healthy fats', 'Allow self-feeding even if messy — it builds motor skills', 'Don\'t force-feed; trust their appetite'] },
      { title: 'Behaviour & Emotional Development', items: ['Tantrums are normal — stay calm, validate feelings', 'Set simple, consistent boundaries', 'Praise effort, not just results', 'Encourage parallel play with other children', 'Start simple chores: putting toys away, wiping spills'] },
      { title: 'Health Checks', items: ['15-18 months: MMR 2nd dose, Varicella', 'Annual dental checkup from age 1', 'Check vision and hearing if concerns arise', 'Deworm every 6 months as per IAP guidelines'] },
    ],
  },
  preschool: {
    sections: [
      { title: 'School Readiness', items: ['Practice holding crayons and pencils (tripod grip by age 4)', 'Learn to recognise own name in writing', 'Count objects up to 10-20', 'Identify basic colours and shapes', 'Practice sitting and focusing for 10-15 minutes'] },
      { title: 'Social Skills', items: ['Takes turns in games and conversations', 'Makes friends and shows empathy', 'Understands rules of simple games', 'Expresses feelings with words instead of hitting', 'Separates from parents without excessive distress'] },
      { title: 'Physical Development', items: ['Runs, jumps, and climbs confidently', 'Catches a ball, rides a tricycle', 'Draws circles, crosses, and simple figures', 'Dresses and undresses with minimal help', 'Uses toilet independently'] },
      { title: 'Play-Based Learning', items: ['Pretend play develops creativity and language', 'Building blocks boost spatial reasoning', 'Outdoor play for at least 1 hour daily', 'Limit screen time to under 1 hour of quality content', 'Arts and crafts develop fine motor skills'] },
    ],
  },
  'early-childhood': {
    sections: [
      { title: 'Reading & Academics', items: ['Read independently for short periods', 'Write simple words and sentences', 'Understand basic addition and subtraction', 'Follow multi-step instructions', 'Ask "why" questions and engage in discussions'] },
      { title: 'Moral & Emotional Development', items: ['Understands right from wrong in familiar situations', 'Shows concern for others who are hurt or sad', 'Can manage frustration with guidance', 'Develops a sense of fairness', 'Enjoys helping with household tasks'] },
      { title: 'Independence', items: ['Bathes and dresses with minimal help', 'Packs and organises own school bag', 'Follows a morning/bedtime routine', 'Makes simple choices (what to wear, which book)', 'Handles basic safety rules (crossing roads, stranger awareness)'] },
      { title: 'Nutrition & Health', items: ['Balanced meals with all food groups', 'Encourage drinking water over sugary drinks', 'Ensure 9-11 hours of sleep per night', '1 hour of active play daily', 'Annual health and vision checkup'] },
    ],
  },
};

export default function GuideDetailPage() {
  const { stage } = useParams();
  const navigate = useNavigate();

  const stageInfo = GUIDE_STAGES.find((s) => s.slug === stage);
  const content = GUIDE_CONTENT[stage];

  if (!stageInfo || !content) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Guide not found.</p>
        <Button variant="ghost" onClick={() => navigate('/guides')} className="mt-4">
          Back to Guides
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate('/guides')}
          className="text-sm text-primary-600 hover:text-primary-700 mb-3 inline-flex items-center gap-1"
        >
          <ChevronRightIcon className="w-4 h-4 rotate-180" />
          All Guides
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
            <BookIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">{stageInfo.title}</h1>
            <Badge variant="primary">{stageInfo.ageRange}</Badge>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-3">{stageInfo.description}</p>
      </div>

      {content.sections.map((section) => (
        <Card key={section.title} className="p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-3">{section.title}</h3>
          <ul className="space-y-2.5">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}

      <Card className="p-5 bg-gray-50 border-gray-200">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Based on WHO and IAP (Indian Academy of Pediatrics) guidelines.
          Every child develops at their own pace. Consult your paediatrician for personalised advice.
        </p>
      </Card>
    </div>
  );
}
