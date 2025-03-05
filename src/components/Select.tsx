import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  label?: string;
  className?: string;
}

export const Select = ({
  value,
  onChange,
  options,
  placeholder = 'Seçiniz',
  label,
  className = '',
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={`relative ${className}`}>
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <ListboxButton
          className={`relative w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 py-3 pl-3.5 pr-10 text-left text-[15px] text-gray-900 shadow-sm transition-all duration-200 hover:bg-gray-100 focus:border-primary-500 focus:bg-white focus:shadow-md focus:outline-none focus:ring-1 focus:ring-primary-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700/50 dark:focus:border-primary-400 dark:focus:bg-gray-800 ${
            !value ? 'text-gray-500 dark:text-gray-400' : ''
          }`}
        >
          <span className="block truncate">{value || placeholder}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <BiChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </span>
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          beforeEnter={() => setIsOpen(true)}
          afterLeave={() => setIsOpen(false)}
        >
          <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 sm:text-sm">
            <ListboxOption
              value=""
              className={({ selected }) =>
                `relative cursor-pointer select-none py-2 pl-3.5 pr-9 ${
                  selected
                    ? 'bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-100'
                    : 'text-gray-900 dark:text-gray-100'
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {placeholder}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600 dark:text-primary-400">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </>
              )}
            </ListboxOption>
            {options.map(option => (
              <ListboxOption
                key={option}
                value={option}
                className={({ selected }) =>
                  `relative cursor-pointer select-none py-2 pl-3.5 pr-9 ${
                    selected
                      ? 'bg-primary-50 text-primary-900 dark:bg-primary-900/20 dark:text-primary-100'
                      : 'text-gray-900 dark:text-gray-100'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600 dark:text-primary-400">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};
