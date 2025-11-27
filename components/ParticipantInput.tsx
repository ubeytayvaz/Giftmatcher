import React, { useState } from 'react';
import { Button } from './Button';
import { Translation } from '../translations';

interface ParticipantInputProps {
  onAdd: (name: string, phoneNumber: string) => void;
  t: Translation;
}

export const ParticipantInput: React.FC<ParticipantInputProps> = ({ onAdd, t }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), phone.trim());
      setName('');
      setPhone('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.placeholderName}
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-xmas-gold focus:border-transparent backdrop-blur-sm transition-all"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.placeholderPhone}
          className="flex-1 sm:max-w-[180px] px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-xmas-gold focus:border-transparent backdrop-blur-sm transition-all"
        />
        <Button type="submit" variant="secondary" disabled={!name.trim()}>
          <span className="text-xl">+</span> {t.addButton}
        </Button>
      </div>
      <p className="text-xs text-left text-white/40 mt-2 px-1">
        {t.phoneNote}
      </p>
    </form>
  );
};