// dalyStore.mjs
import { create } from 'zustand';
// Импортируем изображения
import MineCardImage from '../components/images/MineCardQuestion.png';
import kangaroo from '../components/images/kangaroo.png';

export class DayStore {
  constructor() {
    // Используем импортированные изображения
    this.items = [
      { id: 1, image: MineCardImage, card:0 },
      { id: 2, image: MineCardImage, card:0 },
      { id: 3, image: MineCardImage, card:0 },
    ];
    this.promoEndTime = null; // Время окончания акции
  }

  // Метод для изменения изображения по id
  updateImage(itemId, newImage) {
    if (!newImage) {
      throw new Error("Image URL must be provided");
    }

    const itemIndex = this.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      throw new Error(`Item with id ${itemId} not found`);
    }

    this.items[itemIndex].image = newImage; // Обновляем изображение
    return this.items[itemIndex]; // Возвращаем обновлённый объект
  }

  // Метод для изменения времени окончания акции
  updatePromoEndTime(newEndTime) {
    if (isNaN(new Date(newEndTime).getTime())) {
      throw new Error("Invalid date format for promo end time");
    }

    this.promoEndTime = newEndTime;
    return this.promoEndTime; // Возвращаем новое время окончания
  }

  // Метод для очистки хранилища и установки нового времени окончания акции
  resetStorage(newEndTime) {
    if (isNaN(new Date(newEndTime).getTime())) {
      throw new Error("Invalid date format for promo end time");
    }

    this.items = []; // Очищаем массив items
    this.promoEndTime = newEndTime; // Устанавливаем новое время окончания акции
    return { items: this.items, promoEndTime: this.promoEndTime }; // Возвращаем текущее состояние
  }

  // Метод для получения текущего состояния
  getState() {
    return {
      items: this.items,
      promoEndTime: this.promoEndTime,
    };
  }
}