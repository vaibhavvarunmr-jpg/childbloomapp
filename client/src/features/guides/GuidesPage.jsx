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
        <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Development Guides</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
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
              className={`p-4 sm:p-5 active:scale-[0.98] transition-transform ${isCurrent ? 'ring-2 ring-primary-200 border-primary-200' : ''}`}
              onClick={() => navigate(`/guides/${stage.slug}`)}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isCurrent ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  <BookIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">{stage.title}</h3>
                    {isCurrent && <Badge variant="primary">Current</Badge>}
                  </div>
                  <p className="text-[11px] sm:text-xs font-medium text-primary-600 mb-0.5 sm:mb-1">{stage.ageRange}</p>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{stage.description}</p>
                </div>
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 flex-shrink-0 mt-1" />
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5 bg-gray-50 border-gray-200">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          These guides are based on WHO and IAP (Indian Academy of Pediatrics) recommendations.
          Always consult your paediatrician for personalised advice.
        </p>
      </Card>
    </div>
  );
}
