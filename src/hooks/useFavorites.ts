import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const FAVORITES_STORAGE_KEY =
  "velora-moto-favorites";

function readFavoritesFromStorage(): number[] {
  try {
    const savedValue = localStorage.getItem(
      FAVORITES_STORAGE_KEY,
    );

    if (!savedValue) {
      return [];
    }

    const parsedValue: unknown =
      JSON.parse(savedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (item): item is number =>
        typeof item === "number" &&
        Number.isInteger(item),
    );
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<
    number[]
  >(() => readFavoritesFromStorage());

  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favoriteIds),
      );
    } catch {
      // Сайт продолжит работать, даже если localStorage недоступен.
    }
  }, [favoriteIds]);

  useEffect(() => {
    function handleStorageChange(
      event: StorageEvent,
    ) {
      if (
        event.key !== FAVORITES_STORAGE_KEY
      ) {
        return;
      }

      setFavoriteIds(
        readFavoritesFromStorage(),
      );
    }

    window.addEventListener(
      "storage",
      handleStorageChange,
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange,
      );
    };
  }, []);

  const favoriteIdSet = useMemo(
    () => new Set(favoriteIds),
    [favoriteIds],
  );

  const isFavorite = useCallback(
    (motorcycleId: number) => {
      return favoriteIdSet.has(motorcycleId);
    },
    [favoriteIdSet],
  );

  const addFavorite = useCallback(
    (motorcycleId: number) => {
      setFavoriteIds((currentIds) => {
        if (
          currentIds.includes(motorcycleId)
        ) {
          return currentIds;
        }

        return [
          ...currentIds,
          motorcycleId,
        ];
      });
    },
    [],
  );

  const removeFavorite = useCallback(
    (motorcycleId: number) => {
      setFavoriteIds((currentIds) =>
        currentIds.filter(
          (id) => id !== motorcycleId,
        ),
      );
    },
    [],
  );

  const toggleFavorite = useCallback(
    (motorcycleId: number) => {
      setFavoriteIds((currentIds) => {
        if (
          currentIds.includes(motorcycleId)
        ) {
          return currentIds.filter(
            (id) => id !== motorcycleId,
          );
        }

        return [
          ...currentIds,
          motorcycleId,
        ];
      });
    },
    [],
  );

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
  }, []);

  return {
    favoriteIds,
    favoritesCount: favoriteIds.length,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  };
}