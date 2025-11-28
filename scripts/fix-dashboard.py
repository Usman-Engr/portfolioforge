import re

# Read the file
with open('src/app/dashboard/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update imports - remove MoreVertical, add new components
content = re.sub(
    r"import { Plus, Eye, Edit, Trash2, ExternalLink, Copy, Loader2, MoreVertical, Activity, Settings } from 'lucide-react';",
    "import { Plus, Eye, Edit, Trash2, ExternalLink, Copy, Loader2, Activity, Settings } from 'lucide-react';\nimport ConfirmModal from '@/components/ui/ConfirmModal';\nimport LoadingOverlay from '@/components/ui/LoadingOverlay';",
    content
)

# 2. Add new state variables after deletingId
content = re.sub(
    r"(const \[deletingId, setDeletingId\] = useState<string \| null>\(null\);)",
    r"\1\n    const [publishingId, setPublishingId] = useState<string | null>(null);\n    const [showDeleteModal, setShowDeleteModal] = useState(false);\n    const [portfolioToDelete, setPortfolioToDelete] = useState<Portfolio | null>(null);",
    content
)

# 3. Replace handleDelete function
old_handle_delete = r"const handleDelete = async \(id: string\) => \{[^}]+\}[^}]+\}[^}]+\};"
new_handle_delete = """const handleDelete = async (portfolio: Portfolio) => {
        setPortfolioToDelete(portfolio);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!portfolioToDelete) return;

        setDeletingId(portfolioToDelete.id);
        try {
            const response = await fetch(`/api/portfolios/${portfolioToDelete.id}`, {
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
    };"""

content = re.sub(old_handle_delete, new_handle_delete, content, flags=re.DOTALL)

# 4. Update handleTogglePublish to add loading state
old_toggle = r"const handleTogglePublish = async \(portfolio: Portfolio\) => \{[^}]+\}[^}]+\}[^}]+\};"
new_toggle = """const handleTogglePublish = async (portfolio: Portfolio) => {
        setPublishingId(portfolio.id);
        try {
            const response = await fetch(`/api/portfolios/${portfolio.id}`, {
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
    };"""

content = re.sub(old_toggle, new_toggle, content, flags=re.DOTALL)

# 5. Update onDelete call to pass portfolio object
content = re.sub(
    r"onDelete=\{\(\) => handleDelete\(portfolio\.id\)\}",
    "onDelete={() => handleDelete(portfolio)}",
    content
)

# 6. Update onEdit to use 'id' instead of 'portfolioId'
content = re.sub(
    r"onEdit=\{\(\) => router\.push\(`/builder-new\?portfolioId=\$\{portfolio\.id\}`\)\}",
    "onEdit={() => router.push(`/builder-new?id=${portfolio.id}`)}",
    content
)

# 7. Add modals before the closing divs
# Find the last </div></div> before the closing brace of the component
content = re.sub(
    r"(\s+</div>\s+</div>\s+\);\s+})",
    r"""
            {/* Modals */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setPortfolioToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Portfolio"
                message={`Are you sure you want to delete "${portfolioToDelete?.data?.personal?.name || 'this portfolio'}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                isDestructive={true}
                isLoading={deletingId !== null}
            />

            <LoadingOverlay 
                isVisible={publishingId !== null}
                message="Updating portfolio..."
            />
        </div>
    </div>
    );
}""",
    content
)

# Write the updated content
with open('src/app/dashboard/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Dashboard page updated successfully!")
