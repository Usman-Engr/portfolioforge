import { useState, useEffect, useCallback } from 'react';

interface UseAutoSaveOptions {
    onSave: () => Promise<void>;
    delay?: number; // milliseconds
}

export function useAutoSave({ onSave, delay = 30000 }: UseAutoSaveOptions) {
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
    const [hasChanges, setHasChanges] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

    // Detect online/offline status
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Auto-save logic
    useEffect(() => {
        if (!hasChanges || !isOnline) return;

        const timer = setTimeout(async () => {
            setSaveStatus('saving');
            try {
                await onSave();
                setSaveStatus('saved');
                setHasChanges(false);
            } catch (error) {
                console.error('Auto-save failed:', error);
                setSaveStatus('unsaved');
                // Retry after 5 seconds
                setTimeout(() => setHasChanges(true), 5000);
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [hasChanges, isOnline, onSave, delay]);

    const markAsChanged = useCallback(() => {
        setHasChanges(true);
        setSaveStatus('unsaved');
    }, []);

    const saveNow = useCallback(async () => {
        if (!isOnline) {
            throw new Error('Cannot save while offline');
        }

        setSaveStatus('saving');
        try {
            await onSave();
            setSaveStatus('saved');
            setHasChanges(false);
        } catch (error) {
            setSaveStatus('unsaved');
            throw error;
        }
    }, [isOnline, onSave]);

    return {
        saveStatus,
        isOnline,
        markAsChanged,
        saveNow,
    };
}
