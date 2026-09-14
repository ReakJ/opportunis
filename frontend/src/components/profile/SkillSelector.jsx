import { useMemo, useState } from "react";
import { X, Plus } from "lucide-react";

import { skills } from "../../data/skills";

const SkillSelector = ({ selectedSkills = [], onChange }) => {
  const [query, setQuery] = useState("");

  const filteredSkills = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (search.length < 2) {
      return [];
    }

    return skills
      .filter((skill) => {
        const nameMatches = skill.name.toLowerCase().startsWith(search);

        const aliasMatches = skill.aliases?.some((alias) => 
          alias.toLowerCase().startsWith(search)
        );

        return nameMatches || aliasMatches;
      })
      .filter(
        (skill) => 
          !selectedSkills.some(
            (selected) => 
              selected.toLowerCase() === skill.name.toLowerCase()
          )
      )
      .slice(0, 8);
  }, [query, selectedSkills]);

  const addSkill = (skillName) => {
    const trimmedSkill = skillName.trim();

    if (!trimmedSkill) {
      return;
    }

    const alreadySelected = selectedSkills.some(
      (skill) => skill.toLowerCase() === trimmedSkill.toLowerCase()
    );

    if (alreadySelected) {
      return;
    }

    onChange([...selectedSkills, trimmedSkill]);
    setQuery("");
  }

  const removeSkill = (skillToRemove) => {
    onChange(
      selectedSkills.filter(
        (skill) => skill.toLowerCase() !== skillToRemove.toLowerCase()
      )
    );
  }

  const showSuggestions = query.trim().length >= 2;

  return (
    <div>
      <div className="relative">
        <input 
          type="text" 
          placeholder="e.g. React"
          className="input w-full transition focus:outline-none focus:border-accent"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {showSuggestions && (
          <div className="absolute left-0 top-full z-30 mt-2 max-h-35 w-full overflow-y-auto rounded-xl border border-base-300 bg-base-100 shadow-lg">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => addSkill(skill.name)}
                  className="block w-full px-4 py-3 text-left transition hover:bg-base-200"
                >
                  <p className="font-medium text-base-content">
                    {skill.name}
                  </p>

                  <p className="mt-1 text-sm text-base-content/50">
                    {skill.category}
                  </p>
                </button>
              ))
            ) : (
              <button
                type="button"
                onClick={() => addSkill(query)}
                className="flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-base-200"
              >
                <Plus size={17} className="text-primary" />

                <span className="font-medium">
                  Add{" "}
                  <span className="font-medium">
                    "{query.trim()}"
                  </span>
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {selectedSkills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <div
              key={skill}
              className="badge badge-lg gap-1 border-base-300 bg-base-200 text-base-content"
            >
              {skill}

              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="rounded-full p-0.5 transition hover:bg-base-300"
                aria-label={`Remove ${skill}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillSelector;