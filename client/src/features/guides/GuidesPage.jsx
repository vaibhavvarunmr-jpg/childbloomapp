import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { BookIcon, ChevronRightIcon } from '../../assets/icons';
import { GUIDE_STAGES } from '../../lib/constants';
import { useSelectedChild } from '../../hooks/useChild';
import { getAgeStage } from '../../lib/formatters';

export default function GuidesPage() {
  const navigate = useNavigate();
  const child = useSelectedChild();
  const currentStage = child?.date_of_birth ? getAgeStage(child.date_of_birth) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 font-serif text-forest-700">Development Guides</h1>
        <p className="text-body text-gray-500 mt-1">
          Evidence-based guidance for every stage
        </p>
      </div>

      <div className="space-y-3">
        {GUIDE_STAGES.map((stage) => {
          const isCurrent = currentStage === stage.slug;
          return (
            <Card
              key={stage.slug}
              hover
              className={`p-4 sm:p-5 ${isCurrent ? 'ring-2 ring-forest-200 border-forest-200' : ''}`}
              onClick={() => navigate(`/guides/${stage.slug}`)}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isCurrent ? 'bg-forest-100 text-forest-600' : 'bg-cream-200 text-gray-500'
                }`}>
                  <BookIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                    <h3 className="text-caption font-semibold text-forest-700">{stage.title}</h3>
                    {isCurrent && <Badge variant="primary">Current</Badge>}
                  </div>
                  <p className="text-micro font-medium text-terracotta-400 mb-0.5 sm:mb-1">{stage.ageRange}</p>
                  <p className="text-caption text-gray-500 line-clamp-2">{stage.description}</p>
                </div>
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 flex-shrink-0 mt-1" />
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5 bg-cream-100 border-cream-300">
        <p className="text-micro text-gray-400 text-center leading-relaxed uppercase tracking-wider">
          These guides are based on WHO and IAP (Indian Academy of Pediatrics) recommendations.
          Always consult your paediatrician for personalised advice.
        </p>
      </Card>
    </div>
  );
}
