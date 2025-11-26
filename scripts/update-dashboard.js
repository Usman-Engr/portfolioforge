const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'dashboard', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add imports
content = content.replace(
    `import { Plus, Eye, Edit, Trash2, ExternalLink, Copy, Loader2, MoreVertical, Activity, Settings } from 'lucide-react';`,
    `import { Plus, Eye, Edit, Trash2, ExternalLink, Copy, Loader2, Activity, Settings } from 'lucide-react';
import ConfirmModal from '@/components/ui/ConfirmModal';
import LoadingOverlay from '@/components/ui/LoadingOverlay';`
);

// Add state variables
content = content.replace(
    `const [deletingId, setDeletingId] = useState<string | null>(null);`,
    `const [deletingId, setDeletingId] = useState<string | null>(null);
    const [publishingId, setPublishingId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [portfolioToDelete, setPortfolioToDelete] = useState<Portfolio | null>(null);`
);

// Replace handleDelete
content = content.replace(
    /const handleDelete = async \(id: string\) => \{[\s\S]*?\n    \};/,
    `const handleDelete = async (portfolio: Portfolio) => {
        setPortfolioToDelete(portfolio);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!portfolioToDelete) return;

        setDeletingId(portfolioToDelete.id);
        try {
            const response = await fetch(\`/api/portfolios/\${portfolioToDelete.id}\`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPortfolios(portfolios.filter(p => p.id !== portfolioToDelete.id));
                setShowDeleteModal(false);
                setPortfolioToDelete(null);
            } else {
                const error = await response.json();
                console.error('Delete error:', error);
                alert('Failed to delete portfolio: ' + (error.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete portfolio');
        } finally {
            setDeletingId(null);
        }
    };`
);

// Replace handleTogglePublish
content = content.replace(
    /const handleTogglePublish = async \(portfolio: Portfolio\) => \{[\s\S]*?\n    \};/,
    `const handleTogglePublish = async (portfolio: Portfolio) => {
        setPublishingId(portfolio.id);
        try {
            const response = await fetch(\`/api/portfolios/\${portfolio.id}\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug: portfolio.slug,
                    data: portfolio.data,
                    templateId: portfolio.template_id,
                    isPublished: !portfolio.is_published,
                }),
            });

            if (response.ok) {
                await loadPortfolios();
            } else {
                const error = await response.json();
                console.error('Toggle publish error:', error);
                alert('Failed to toggle publish status: ' + (error.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Toggle publish error:', error);
            alert('Failed to toggle publish status');
        } finally {
            setPublishingId(null);
        }
    };`
);

// Update onDelete call
content = content.replace(
    /onDelete=\{\(\) => handleDelete\(portfolio\.id\)\}/g,
    'onDelete={() => handleDelete(portfolio)}'
);

// Update onEdit call
content = content.replace(
    /onEdit=\{\(\) => router\.push\(`\/builder-new\?portfolioId=\$\{portfolio\.id\}`\)\}/g,
    'onEdit={() => router.push(`/builder-new?id=${portfolio.id}`)}'
);

// Add modals before closing div
content = content.replace(
    `            </div>
        </div>
    );
}`,
    `            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setPortfolioToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Portfolio"
                message={\`Are you sure you want to delete "\${portfolioToDelete?.data?.personal?.name || 'this portfolio'}"? This action cannot be undone.\`}
                confirmText="Delete"
                cancelText="Cancel"
                isDestructive={true}
                isLoading={deletingId !== null}
            />

            <LoadingOverlay 
                isVisible={publishingId !== null}
                message={publishingId ? "Updating portfolio..." : "Processing..."}
            />
        </div>
    );
}`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Dashboard updated successfully!');
