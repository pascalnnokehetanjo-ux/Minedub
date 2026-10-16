import React, { useState } from 'react';
import { SchoolAdministrativeInfo, SubsystemType } from '../types/curriculum';
import { X, Save, School, User, Calendar, MapPin } from 'lucide-react';

interface SchoolSettingsModalProps {
  subsystem: SubsystemType;
  isOpen: boolean;
  onClose: () => void;
  initialInfo: SchoolAdministrativeInfo;
  onSave: (info: SchoolAdministrativeInfo) => void;
}

export const SchoolSettingsModal: React.FC<SchoolSettingsModalProps> = ({
  subsystem,
  isOpen,
  onClose,
  initialInfo,
  onSave
}) => {
  const isFrench = subsystem === 'francophone';
  const [formData, setFormData] = useState<SchoolAdministrativeInfo>(initialInfo);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-slate-900 text-sm">
              {isFrench ? 'Paramètres d\'Établissement & Inspection' : 'School & Pedagogical Information'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          {/* School Name */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {isFrench ? 'Nom de l\'École :' : 'School Name:'}
            </label>
            <input
              type="text"
              value={formData.schoolName}
              onChange={e => setFormData({ ...formData, schoolName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              required
            />
          </div>

          {/* Region & Division */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isFrench ? 'Région :' : 'Region:'}
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={e => setFormData({ ...formData, region: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isFrench ? 'Département :' : 'Division:'}
              </label>
              <input
                type="text"
                value={formData.division}
                onChange={e => setFormData({ ...formData, division: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                required
              />
            </div>
          </div>

          {/* Sub-division */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {isFrench ? 'Arrondissement / Inspection :' : 'Sub-Division / Inspectorate:'}
            </label>
            <input
              type="text"
              value={formData.subDivision}
              onChange={e => setFormData({ ...formData, subDivision: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
              required
            />
          </div>

          {/* Teacher & Head Teacher */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isFrench ? 'Nom du Maître :' : 'Teacher\'s Name:'}
              </label>
              <input
                type="text"
                value={formData.teacherName}
                onChange={e => setFormData({ ...formData, teacherName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isFrench ? 'Nom du Directeur :' : 'Head Teacher\'s Name:'}
              </label>
              <input
                type="text"
                value={formData.headTeacherName}
                onChange={e => setFormData({ ...formData, headTeacherName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                required
              />
            </div>
          </div>

          {/* Academic Year, Class Roll, Boys/Girls */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isFrench ? 'Année Scolaire :' : 'Academic Year:'}
              </label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={e => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isFrench ? 'Effectif (Total) :' : 'Total Roll:'}
              </label>
              <input
                type="number"
                value={formData.classRoll}
                onChange={e => setFormData({ ...formData, classRoll: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                min={1}
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isFrench ? 'Âge Moyen :' : 'Average Age:'}
              </label>
              <input
                type="number"
                value={formData.averageAge}
                onChange={e => setFormData({ ...formData, averageAge: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                min={4}
                max={15}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
            >
              {isFrench ? 'Annuler' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isFrench ? 'Enregistrer' : 'Save Info'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
