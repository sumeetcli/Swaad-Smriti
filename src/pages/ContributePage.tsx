import React, { useState } from 'react';
import { DishStory, saveCustomDish, clearCustomDishes, getCustomDishes } from '../data/dishes';
import {
  Upload,
  Mic,
  Camera,
  FileText,
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface ContributePageProps {
  onNavigate: (page: string) => void;
  onRefreshArchive?: () => void;
}

export const ContributePage: React.FC<ContributePageProps> = ({ onNavigate, onRefreshArchive }) => {
  // Form State
  const [dishName, setDishName] = useState('');
  const [stateName, setStateName] = useState('Karnataka');
  const [tagline, setTagline] = useState('');
  const [storyteller, setStoryteller] = useState('');
  const [storytellerNote, setStorytellerNote] = useState('');
  const [storySummary, setStorySummary] = useState('');
  const [transcript, setTranscript] = useState('');
  const [didYouKnow, setDidYouKnow] = useState('');
  const [whyItMatters, setWhyItMatters] = useState('');
  const [atHome, setAtHome] = useState('');
  const [inHostel, setInHostel] = useState('');

  // Audio state
  const [hasAudioFile, setHasAudioFile] = useState(false);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [audioConsentStatus, setAudioConsentStatus] = useState<'attached' | 'pending'>('attached');

  // Photo state
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoCaption, setPhotoCaption] = useState('');
  const [isAIPhoto, setIsAIPhoto] = useState(false);
  const [photoCredit, setPhotoCredit] = useState('Source: Student Archive');

  // UI state
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdDishId, setCreatedDishId] = useState<string | null>(null);

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Handle Photo selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Audio selection
  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioPreviewUrl(url);
      setHasAudioFile(true);
      setAudioConsentStatus('attached');
    }
  };

  // Quick fill with realistic sample for demonstration to teacher
  const fillSampleData = () => {
    setDishName('Pesarattu Upma');
    setStateName('Andhra Pradesh');
    setTagline('Crisp green moong dal crepe stuffed with warm ginger-tempered upma.');
    setStoryteller('Ananya Rao');
    setStorytellerNote('Second-year student from Vijayawada');
    setStorySummary('Ananya describes how Pesarattu Upma is the quintessential Sunday morning ritual in coastal Andhra. The contrast between the roasted ginger-spiced moong crepe and the soft, savory upma stuffing brings back memories of family dining tables before the quiet isolation of hostel exam weeks.');
    setTranscript(`[Demonstration Oral History Transcript]

"Whenever I smell ginger and cumin crackling in oil, I am instantly back in our home in Vijayawada. In coastal Andhra, Pesarattu is made with soaked whole green gram ground fresh with lots of ginger and green chillies. It doesn't need overnight fermentation like dosa.

The best part is stuffing hot, fluffy semolina upma directly inside the crisp crepe right as it comes off the cast-iron tawa. You fold it over and serve it with fiery ginger-tamarind allam pachadi. In our college hostel, we only get thick soggy bread or bland poha. Whenever a care parcel arrives from home with my mother's homemade ginger chutney, half the corridor gathers in my room to share it over plain dosas."`);
    setDidYouKnow('Pesarattu is one of the oldest recorded crepes in Andhra culinary history, documented as early as the 7th century. Unlike traditional urad-rice dosas, its whole mung bean batter requires zero fermentation, making it a nutrient-dense Ayurvedic breakfast renowned for its cooling and light digestive properties.');
    setWhyItMatters('Pesarattu showcases the agro-ecological abundance of green moong cultivation in the Krishna-Godavari delta, balancing high plant-protein legumes with digestive ginger and cumin.');
    setAtHome('Folded hot off the iron tawa on weekend mornings with spicy allam pachadi and coconut chutney.');
    setInHostel('Craved when mess breakfasts feel monotonous, reminisced over phone calls with mother.');
    setPhotoCaption('Golden crisp green moong pesarattu folded with ginger upma.');
    setPhotoCredit('AI Visual Recreation · Ancestral Kitchen Ambience');
    setIsAIPhoto(true);
    setPhotoPreviewUrl('/images/dishes/hyderabadi-biryani/cover.jpg');
    setAudioConsentStatus('pending');
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    const slug = dishName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newDish: DishStory = {
      id: slug || `custom-${Date.now()}`,
      name: dishName,
      state: stateName,
      tagline: tagline || 'A cherished culinary memory from home.',
      whyItMatters: whyItMatters || 'Documented as part of student oral histories exploring regional gastronomy and food memory.',
      storyteller: storyteller || 'Student Contributor',
      storytellerNote: storytellerNote || `Student from ${stateName}`,
      storySummary: storySummary || 'Oral history narrative documented for the Swaad Smriti student archive.',
      transcript: transcript || '[Archival Transcript: Oral narrative shared during student recording.]',
      didYouKnow: didYouKnow || 'Traditional regional recipes reflect localized crop biodiversity, indigenous fermentation wisdom, and deep cultural memory.',
      atHome: atHome || 'Prepared with care during family meals and celebrations.',
      inHostel: inHostel || 'Craved during university life as a comforting reminder of home.',
      audioUrl: audioConsentStatus === 'attached' ? audioPreviewUrl : null,
      audioDuration: '02:15',
      mapCoordinates: [15.4589, 75.0078],
      isCustomSubmission: true,
      photos: [
        {
          url: photoPreviewUrl || '/images/dishes/dal-baati-churma/cover.jpg',
          alt: `${dishName} archival photograph`,
          caption: photoCaption || `Archival plate of ${dishName}`,
          sourceCredit: photoCredit || 'Source: Student Archive',
          isAI: isAIPhoto,
          aiRationale: isAIPhoto
            ? 'Recreates the ambience of ancient rural houses and historical dining settings where camera documentation was unavailable.'
            : undefined
        }
      ]
    };

    saveCustomDish(newDish);
    if (onRefreshArchive) onRefreshArchive();
    setCreatedDishId(newDish.id);
    setSubmitSuccess(true);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demonstration submissions and return to the original 10 archive dishes?')) {
      clearCustomDishes();
      if (onRefreshArchive) onRefreshArchive();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Header */}
      <header className="pb-6 border-b border-[var(--border-warm)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="stamp-badge">
            Submission Portal
          </span>
          <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono">
            STUDENT & COMMUNITY ARCHIVE
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
          Contribute an Oral History
        </h1>
        <p className="font-heading italic text-lg sm:text-xl text-[#B3261E] dark:text-[#E25B53] mt-2">
          Share a food memory, voice recording, photograph, and transcript from home
        </p>
      </header>

      {/* Demonstration Banner for Teacher & Evaluation */}
      <div className="bg-amber-500/10 dark:bg-amber-950/25 border border-amber-600/30 rounded-xl p-5 sm:p-6 space-y-3 recipe-card-stitch">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-amber-500/20 text-[#B3261E] dark:text-amber-400 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-sm">
            <h3 className="font-heading font-bold text-base text-[var(--text-primary)]">
              Interactive Archival Demonstration Model
            </h3>
            <p className="text-[var(--text-muted)] leading-relaxed font-serif">
              This portal demonstrates how the digital archive operates in production: students, alumni, and regional contributors can submit oral histories, voice recordings, transcripts, and photographs without requiring accounts or sign-ins.
            </p>
            <p className="text-xs font-mono text-[var(--text-muted)] pt-1">
              Submissions are immediately previewed in the active archive and stored in client storage for classroom demonstration.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-amber-600/20 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={fillSampleData}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#B3261E] text-white hover:bg-[#961F18] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fill with Sample Oral History (Quick Demo)</span>
          </button>

          {getCustomDishes().length > 0 && (
            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[#B3261E] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear demo submissions ({getCustomDishes().length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Success Notification */}
      {submitSuccess && createdDishId && (
        <div className="bg-emerald-500/10 border border-emerald-600/30 rounded-xl p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
              Archive Record Successfully Generated!
            </h3>
            <p className="text-sm text-[var(--text-muted)] mt-1 font-serif">
              "{dishName}" has been added to the active archive catalogue and map index.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate(`dish/${createdDishId}`)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#B3261E] hover:bg-[#961F18] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>View Archival Record Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitSuccess(false);
                setDishName('');
                setTagline('');
              }}
              className="px-4 py-2.5 rounded-lg border border-[var(--border-warm)] text-xs font-medium text-[var(--text-muted)] hover:bg-stone-200/50 cursor-pointer"
            >
              Submit Another Memory
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      {!submitSuccess && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Contributor Identification */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-xl p-6 recipe-card-stitch space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-warm)]/60 text-[#B3261E] dark:text-[#E25B53]">
              <BookOpen className="w-4 h-4" />
              <h2 className="font-heading font-bold text-base text-[var(--text-primary)]">
                1. Contributor & Provenance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                  Story Told By (Student Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={storyteller}
                  onChange={(e) => setStoryteller(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                  Contributor Context
                </label>
                <input
                  type="text"
                  placeholder="e.g. Second year student from Kerala"
                  value={storytellerNote}
                  onChange={(e) => setStorytellerNote(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                  State of Origin *
                </label>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                >
                  {indianStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                  Dish / Food Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pesarattu Upma"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                One-Line Tagline / Food Memory
              </label>
              <input
                type="text"
                placeholder="e.g. Crisp green moong crepe stuffed with warm semolina upma."
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E]"
              />
            </div>
          </div>

          {/* Section 2: Narrative & Transcript */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-xl p-6 recipe-card-stitch space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-warm)]/60 text-[#B3261E] dark:text-[#E25B53]">
              <FileText className="w-4 h-4" />
              <h2 className="font-heading font-bold text-base text-[var(--text-primary)]">
                2. Story Narrative & Audio Transcript
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                Story Summary (Short Narrative Overview) *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Summarize the core oral history recording and what this food represents to the student..."
                value={storySummary}
                onChange={(e) => setStorySummary(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E] font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                Full Audio Transcript *
              </label>
              <textarea
                rows={6}
                required
                placeholder="Enter the full verbatim or translated transcript of the student interview..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E] font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                "Did You Know?" Gastronomic Fact
              </label>
              <textarea
                rows={2}
                placeholder="An accurate culinary history, preparation method, or cultural fact..."
                value={didYouKnow}
                onChange={(e) => setDidYouKnow(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E] font-serif"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                  Memory At Home
                </label>
                <textarea
                  rows={2}
                  placeholder="How was this food prepared and eaten at home?"
                  value={atHome}
                  onChange={(e) => setAtHome(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E] font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                  Reality In the Hostel
                </label>
                <textarea
                  rows={2}
                  placeholder="How does hostel food compare? What do you miss?"
                  value={inHostel}
                  onChange={(e) => setInHostel(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[#B3261E] font-serif"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Audio & Photograph Upload */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-xl p-6 recipe-card-stitch space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-warm)]/60 text-[#B3261E] dark:text-[#E25B53]">
              <Upload className="w-4 h-4" />
              <h2 className="font-heading font-bold text-base text-[var(--text-primary)]">
                3. Audio Recording & Photography
              </h2>
            </div>

            {/* Audio Section */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-[#B3261E]" />
                Oral History Audio Recording
              </span>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-warm)] bg-[var(--bg-paper)] hover:bg-stone-200/50 cursor-pointer text-xs font-semibold text-[var(--text-primary)] transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose MP3 File</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioChange}
                    className="hidden"
                  />
                </label>

                <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="audioConsent"
                      checked={audioConsentStatus === 'attached'}
                      onChange={() => setAudioConsentStatus('attached')}
                      className="accent-[#B3261E]"
                    />
                    <span>Audio Attached</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="audioConsent"
                      checked={audioConsentStatus === 'pending'}
                      onChange={() => setAudioConsentStatus('pending')}
                      className="accent-[#B3261E]"
                    />
                    <span>Consent not given / pending</span>
                  </label>
                </div>
              </div>

              {audioPreviewUrl && audioConsentStatus === 'attached' && (
                <div className="p-3 bg-[var(--bg-paper)] rounded border border-[var(--border-warm)] flex items-center gap-3">
                  <span className="text-xs font-mono text-[var(--text-muted)]">Preview Audio:</span>
                  <audio controls src={audioPreviewUrl} className="h-8 flex-1" />
                </div>
              )}

              {audioConsentStatus === 'pending' && (
                <p className="text-xs font-mono text-amber-700 dark:text-amber-400 italic">
                  Note: "audio recording consent not given / audio recording pending" will be displayed under the player.
                </p>
              )}
            </div>

            {/* Photo Section */}
            <div className="space-y-3 pt-3 border-t border-[var(--border-warm)]/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-[#B3261E]" />
                Food Photograph & Visual Presentation
              </span>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-warm)] bg-[var(--bg-paper)] hover:bg-stone-200/50 cursor-pointer text-xs font-semibold text-[var(--text-primary)] transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>

                <label className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAIPhoto}
                    onChange={(e) => {
                      setIsAIPhoto(e.target.checked);
                      if (e.target.checked) {
                        setPhotoCredit('AI Visual Recreation · Historical Setting');
                      } else {
                        setPhotoCredit('Source: Student Archive');
                      }
                    }}
                    className="accent-[#B3261E]"
                  />
                  <span>Tag as AI Visual Reconstruction (Ancient rural house ambience)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                    Photo Caption (Handwritten Polaroid Style)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Crisp golden crepe with coconut chutney."
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)] font-handwriting text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-1">
                    Image Source Credit
                  </label>
                  <input
                    type="text"
                    value={photoCredit}
                    onChange={(e) => setPhotoCredit(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded border border-[var(--border-warm)] bg-[var(--bg-paper)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              {photoPreviewUrl && (
                <div className="p-3 bg-[var(--bg-paper)] rounded border border-[var(--border-warm)] flex items-center gap-4">
                  <img
                    src={photoPreviewUrl}
                    alt="Preview"
                    className="w-20 h-16 object-cover rounded border border-[var(--border-warm)]"
                  />
                  <div className="text-xs space-y-1">
                    <span className="font-semibold block text-[var(--text-primary)]">Image Selected</span>
                    <p className="font-handwriting text-sm text-[var(--text-muted)] italic">
                      "{photoCaption || 'No caption entered'}"
                    </p>
                    {isAIPhoto && (
                      <span className="stamp-badge text-[0.65rem]">
                        AI Reconstructed Ambience
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('archive')}
              className="text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[#B3261E] font-semibold cursor-pointer"
            >
              &larr; Cancel and Return to Archive
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#B3261E] hover:bg-[#961F18] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Submit Oral History (Classroom Demo)</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
